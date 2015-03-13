/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * (C) Copyright 2013, TNO
 * Author: Eric Smekens
 */

'use strict';
//Used for event emitting.
var EventEmitter = require('events').EventEmitter;
var Transform = require('stream').Transform;
var util = require('util');
var OBDStream = require('./obdstream');
var BluetoothSerialPort = require('bluetooth-serial-port');

/**
 * obdInfo.js for all PIDS.
 * @type {*}
 */
var PIDS = require('./pids/index');

/**
 * Class OBDReader
 *
 * Creates an instance of OBDReader.
 * @constructor
 * @this {OBDReader}
 */

util.inherits(OBDReader, Transform);
function OBDReader() {
    if (!(this instanceof OBDReader)) return new OBDReader();
    Transform.call(this, { writableObjectMode : true });
    var self = this;
    this.connected = false;
    this.writing = false;
    this.queue = [];
    this.POLLINTERVAL = 1000;
    this.activePollers = [];
    this.polling = 0;
    this.pollTo = null;
    this.btSerial = new BluetoothSerialPort();
    this.streamParser = new OBDStream();
    this.streamParser.on('data', function (data) {
        self.writing = false;
        if (self.queue.length) self._writeToBluetooth();
        else if (self.polling && !self.pollTo) self._setPollerTimeout();
        self.emit('data', data);
    });
    return this;
}

/**
 * Attempts discovery of and subsequent connection to Bluetooth device and channel
 * @param {string} query Query string to be fuzzy-ish matched against device name/address
 */
OBDReader.prototype.autoconnect = function autoconnect(query,callback) {
    this.searchDevices(query, true, function (err, address, channel) {
        if (err) return callback(err);
        self.connect(address, channel, callback);
    });
    return this;
};

/**
 * Attempts discovery of Bluetooth devices and channels
 * @param {string} query Query string to be fuzzy-ish matched against device name/address
 * @param {boolean} first return only the first match
 * @param {function} callback callback that gets called either:
 *   with {string} address, {number} channel (if the 'first' boolean is set)
 *   or   {array} {object: {address, channel}}
 */
OBDReader.prototype.searchDevices = function searchDevices(query, first, callback) {
    var search = new RegExp(query.replace(/\W/g, ''), 'gi');
    var reply = [];
    var self = this;
    this.btSerial.on('found', function (address, name) {
        if (!query || search.test(name.replace(/\W/g, '')) || search.test(address.replace(/\W/g, ''))) {
            self.emit('debug', 'Found device: ' + name + ' (' + address + ')');
            btSerial.findSerialPortChannel(address, function (err, channel) {
                if (err) return self.emit('debug', err);
                self.emit('debug', 'Found device channel: ' + channel);
                if (first) {
                    self.btSerial.removeAllListeners('found').removeAllListeners('finished');
                    return callback(null, address, channel);
                }
                reply.push({address: address, channel: channel});
            });
        } else {
            this.emit('debug', 'Ignoring device: ' + name + ' (' + address + ')');
        }
    }).once('finished', function () {
        self.btSerial.removeAllListeners('found');
        var err = reply.length > 0 ? null : new Error('No suitable devices found');
        if (first && err) return callback(err, null, null);
        return callback(err, reply);
    }).inquire();
};

/**
 * Connect/Open the bluetooth serial port and add events to bluetooth-serial-port.
 * Also starts the intervalWriter that is used to write the queue.
 * @this {OBDReader}
 * @param {string} address
 * @param {number} channel
 * @return {this}
 */

OBDReader.prototype.connect = function connect(address, channel, callback) {
    var self = this;
    this.btSerial.connect(address, channel, function (err) {
        if (err) {
            self.disconnect();
            return callback(err);
        }
        self.connected = true;
        self.pipe(self.btSerial).pipe(self.streamParser);
        self.write('ATZ');
        //Turns off extra line feed and carriage return
        self.write('ATL0');
        //This disables spaces in in output, which is faster!
        self.write('ATS0');
        //Turns off headers and checksum to be sent.
        self.write('ATH0');
        //Turns off echo.
        self.write('ATE0');
        //Turn adaptive timing to 2. This is an aggressive learn curve for adjusting the timeout. Will make huge difference on slow systems.
        self.write('ATAT2');
        //Set timeout to 10 * 4 = 40msec, allows +20 queries per second. This is the maximum wait-time. ATAT will decide if it should wait shorter or not.
        //self.write('ATST0A');
        //Set the protocol to automatic.
        self.write('ATSP0');
        return callback();
    });
    return this;
};

/**
 * Disconnects/closes the port.
 * @this {OBDReader}
 * @return {this}
 */
OBDReader.prototype.disconnect = function disconnect() {
    clearTimeout(this.writeTo);
    this.stopPolling();
    this.queue = []; //Clears queue
    this.btSerial.disconnect();
    this.connected = false;
    return this;
};

/**
 * Removes all items from the write-queue
 * @this {OBDReader}
 * @return {this}
 */
OBDReader.prototype.resetQueue = function resetQueue() {
    while (this.queue.length) this.queue.pop();
    return this;
};

/**
 * Writes to the bt-serial
 * @this {OBDReader}
 */
OBDReader.prototype._writeToBluetooth = function _writeToBluetooth() {
    this.writing = true;
    if (!this.connected) return this.emit('error', new Error('Bluetooth device is not connected.'));
    this.push(new Buffer(this.queue.shift(), "utf-8"));
};

/**
 * Writes a message to the port. (Queued!) All write functions call this function.
 * @this {OBDReader}
 * @param {string} message The PID or AT Command you want to send. Without \r or \n!
 * @param {number} replies The number of replies that are expected. Default = 0. 0 --> infinite
 * AT Messages --> Zero replies!!
 */
OBDReader.prototype._transform = function _transform(message, enc, cb) {
    var replies;
    if (typeof message !== 'string') {
        replies = message.replies;
        message = message.message;
    }
    if (this.queue.length >= 256) self.emit('error', new Error('Queue-overflow!'));
    else this.queue.push(message + (replies ? replies : '') + '\r');
    if (!this.writing) this._writeToBluetooth();
    return cb();
};

/**
 * Writes a PID value by entering a pid supported name.
 * @this {OBDReader}
 * @param {string} name Look into obdInfo.js for all PIDS.
 */
OBDReader.prototype.requestValueByName = function requestValueByName(name) {
    if (!PIDS.PIDNAMEMAP.hasOwnProperty(name)) this.emit('error', new Error('Request for unsupported value ' + name));
    else this.write(PIDS.PIDNAMEMAP[name]);
    return this;
};

/**
 * Writes all active pollers.
 * @this {OBDReader}
 */
OBDReader.prototype._setPollerTimeout = function _setPollerTimeout() {
    var previousPoll = this.polling;
    var self = this;
    this.polling = Date.now();
    var delay = this.POLLINTERVAL - (this.polling - previousPoll);
    if (delay <= 0) return this._writePollers();
    this.pollTo = setTimeOut(function () { self._writePollers(); }, delay);
};

OBDReader.prototype._writePollers = function _writePollers() {
    this.pollTo = null;
    var self = this;
    this.activePollers.forEach(function (poller) { self.write({message: poller, replies: 1}) });
};

/**
 * Adds a poller to the poller-array.
 * @this {OBDReader}
 * @param {string} name Name of the poller you want to add.
 */
OBDReader.prototype.addPoller = function addPoller(name) {
    if (this.activePollers.indexOf(PIDS.PIDNAMEMAP[name]) === -1) this.activePollers.push(PIDS.PIDNAMEMAP[name]);
    return this;
};

/**
 * Removes an poller.
 * @this {OBDReader}
 * @param {string} name Name of the poller you want to remove.
 */
OBDReader.prototype.removePoller = function removePoller(name) {
    var index = this.activePollers.indexOf(PIDS.PIDNAMEMAP[name]);
    this.activePollers.splice(index, 1);
    return this;
};

/**
 * Removes all pollers.
 * @this {OBDReader}
 */
OBDReader.prototype.removeAllPollers = function removeAllPollers() {
    this.stopPolling();
    while (this.activePollers.length) this.activePollers.pop();
    return this;
};

/**
 * Starts polling.
 * @this {OBDReader}
 * @param {number} interval Frequency how often all variables should be polled. (in ms). 
 *     If no value is given, then for each activePoller 75ms will be added.
 */
OBDReader.prototype.startPolling = function startPolling(interval) {
    this.POLLINTERVAL = interval || this.activePollers.length * 75;
    this._setPollerTimeout();
    return this;
};

/**
 * Stops polling.
 * @this {OBDReader}
 */
OBDReader.prototype.stopPolling = function stopPolling() {
    if (this.pollTo) {
        clearTimeout(this.pollTo);
        this.pollTo = null;
    }
    this.polling = 0;
    return this;
};

module.exports = OBDReader;
