'use strict';

var Transform = require('stream').Transform;
var util = require('util');
var OBDStream = require('./obdstream');
var BluetoothSerialPort = require('bluetooth-serial-port');
var PIDS = require('./pids/index');
//Turns off extra line feed and carriage return
//This disables spaces in in output, which is faster!
//Turns off headers and checksum to be sent.
//Turns off echo.
//Turn adaptive timing to 2. This is an aggressive learn curve for adjusting the timeout. Will make huge difference on slow systems.
//Set the protocol to automatic.
var INITIALCOMMANDS = ['ATZ', 'ATL0', 'ATS0', 'ATH0', 'ATE0', 'ATAT2', 'ATSP0'];

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
    this.messageIdCounter = 0;
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
        data.id = self.pendingMessage;
        if (!self._sendPendingData() && self.polling && !self.pollTo) self._setPollerTimeout();
        self.emit('values', data);
    });
    return this;
}


OBDReader.prototype._asyncWrite = function _asyncWrite(data, cb) {
    var j = data.length;
    var y = 0;
    var self = this;
    var _write = function _write() {
        if (j > y) self.write(data[y], function () {
            y += 1;
            _write();
        });
        else return cb();
    };
    _write();
    return this;
};

OBDReader.prototype._sendPendingData = function _sendPendingData() {
    if (!this.queue.length) return false;
    var self = this;
    this._writeToBluetooth(function (err, data) {
        if (err) return self.emit('error', err);
        self.push(data);
    });
    return true;
};

/**
 * Writes a message to the port. (Queued!) All write functions call this function.
 * @this {OBDReader}
 * @param {string} message The PID or AT Command you want to send. Without \r or \n!
 * @param {number} replies The number of replies that are expected. Default = 0. 0 --> infinite
 * AT Messages --> Zero replies!!
 */
OBDReader.prototype._transform = function _transform(message, enc, cb) {
    var queueItem = {id: (this.messageIdCounter += 1)};
    var replies;
    if (typeof message !== 'string') {
        replies = message.replies;
        message = message.message;
    }
    queueItem.message = message + (message.replies ? message.replies : '') + '\r';
    if (this.queue.length >= 256) self.emit('error', new Error('Queue-overflow!'));
    else this.queue.push(queueItem);
    if (this.writing) return cb();
    return this._writeToBluetooth(cb);
};

/**
 * Writes to the bt-serial
 * @this {OBDReader}
 */
OBDReader.prototype._writeToBluetooth = function _writeToBluetooth(cb) {
    if (!this.connected) return cb(new Error('Bluetooth device is not connected.'));
    this.writing = true;
    var queuedItem = this.queue.shift();
    this.pendingMessage = queuedItem.id;
    return cb(null, new Buffer(queuedItem.message, "utf-8"));
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
    return this;
};

OBDReader.prototype._writePollers = function _writePollers() {
    this.pollTo = null;
    var self = this;
    this.activePollers.forEach(function (poller) { self.write({message: poller, replies: 1}); });
    return this;
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
    if (index > -1) this.activePollers.splice(index, 1);
    return this;
};

/**
 * Removes all pollers.
 * @this {OBDReader}
 */
OBDReader.prototype.removeAllPollers = function removeAllPollers() {
    while (this.activePollers.length) this.activePollers.pop();
    return this.stopPolling();
};

/**
 * Starts polling.
 * @this {OBDReader}
 * @param {number} interval Frequency how often all variables should be polled. (in ms).
 *     If no value is given, then for each activePoller 75ms will be added.
 */
OBDReader.prototype.startPolling = function startPolling(interval) {
    this.POLLINTERVAL = interval || this.activePollers.length * 75;
    return this._setPollerTimeout();
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
 * Removes all items from the write-queue
 * @this {OBDReader}
 * @return {this}
 */
OBDReader.prototype.resetQueue = function resetQueue() {
    while (this.queue.length) this.queue.pop();
    return this;
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
        self.pipe(self.btSerial).pipe(self.streamParser.reset());
        self._asyncWrite(INITIALCOMMANDS, function () {
            var idToWait = self.messageIdCounter;
            var serialIsInitialized = function (data) {
                if (data.id !== idToWait) return;
                removeInitCallback();
                return callback();
            };
            var removeInitCallback = function () {
                self.removeListener('values', serialIsInitialized);
            };
            self.on('values', serialIsInitialized);
        });
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
    this.stopPolling().resetQueue().btSerial.disconnect();
    this.connected = false;
    return this;
};

/**
 * Attempts discovery of and subsequent connection to Bluetooth device and channel
 * @param {string} query Query string to be fuzzy-ish matched against device name/address
 */
OBDReader.prototype.autoconnect = function autoconnect(query, callback) {
    var self = this;
    if (typeof query === 'function') {
        callback = query;
        query = null;
    }
    return this.searchDevices(query, true, function (err, address, channel) {
        if (err) return callback(err);
        return self.connect(address, channel, callback);
    });
};

/**
 * Attempts discovery of Bluetooth devices and channels
 * @param {string} query Query string to be fuzzy-ish matched against device name/address
 * @param {boolean} first return only the first match
 * @param {function} callback callback that gets called either:
 *   with {string} address, {number} channel (if the 'first' boolean is set)
 *   or   {array} {object: {address, channel}}
 */
OBDReader.prototype.searchDevices = function searchDevices(query, first, cb) {
    var self = this;
    var search = query ? new RegExp(query.replace(/\W/g, ''), 'gi') : null;
    var callback = (function(j) { return function() { if (j) { j -= 1; cb.apply(self, arguments); } else { return null; }}; }(1));
    var pendingCheck = 0;
    var reply = [];
    this.btSerial.on('found', function (address, name) {
        if (!query || search && (search.test(name.replace(/\W/g, '')) || search.test(address.replace(/\W/g, '')))) {
            pendingCheck += 1;
            self.emit('debug', 'Found device: ' + name + ' (' + address + ')');
            self.btSerial.findSerialPortChannel(address, function (err, channel) {
                if (err) {
                    self.btSerial.removeAllListeners();
                    return callback(err);
                }
                self.emit('debug', 'Found device channel: ' + channel);
                if (first) {
                    self.btSerial.removeAllListeners();
                    return callback(null, address, channel);
                }
                pendingCheck -= 1;
                reply.push({address: address, channel: channel});
                if (!pendingCheck) {
                    return callback(null, reply);
                }
            });
        } else {
            self.emit('debug', 'Ignoring device: ' + name + ' (' + address + ')');
        }
    }).once('finished', function () {
        self.btSerial.removeAllListeners('found');
        if (!pendingCheck) return callback(new Error('No suitable devices found'));
    }).inquire();
    return this;
};

module.exports = OBDReader;
