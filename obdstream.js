'use strict';

var StringDecoder = require('string_decoder').StringDecoder;
var Transform = require('stream').Transform;
var PIDPIDMAP = require('./pids/index').PIDPIDMAP;

require('util').inherits(OBDStream, Transform);
function OBDStream() {
    if (!(this instanceof OBDStream)) return new OBDStream();
    Transform.call(this, { readableObjectMode: true });
    this._reset = true;
    this._buffer = '';
    this._decoder = new StringDecoder('utf8');
}

OBDStream.prototype.reset = function reset() {
    this._reset = true;
    this._buffer = '';
    return this;
};

OBDStream.prototype._transform = function _transform(chunk, encoding, cb) {
    this._buffer += this._decoder.write(chunk);
    var lines = this._buffer.split(/>/);
    this._buffer = lines.pop();
    if (!lines.length) return cb();
    lines = lines.pop().split(/\r/);
    var line, i;
    for (i = 0; i < lines.length; i += 1) {
        line = lines[i].trim();
        if (!line) continue;
        this.push(this._parseOBDCommand(line));
    }
    return cb();
};

/**
 * Parses a hexadecimal string to a reply object. Uses PIDS. (obdInfo.js)
 * @param {string} commandString string that is received over the serialport.
 * @return {Object} reply - The reply.
 * @return {string} reply.value - The value that is already converted. This can be a PID converted answer or "OK" or "NO DATA".
 * @return {string} reply.name - The name. --! Only if the reply is a PID.
 * @return {string} reply.mode - The mode of the PID. --! Only if the reply is a PID.
 * @return {string} reply.pid - The PID. --! Only if the reply is a PID.
 */
OBDStream.prototype._parseOBDCommand = function parseOBDCommand(commandString) {
    var reply = {};
    if (this._reset || commandString === "OK" || commandString === "NO DATA" || commandString === "?") { //No data or OK is the response.
        this._reset = false;
        reply.value = commandString;
        return reply;
    }
    var values = [];
    for (var i = 2; i < commandString.length; i += 2) values.push(commandString.substr(i, 2));
    reply.mode = commandString.slice(0, 2);
    var pidKey = (reply.mode === "41") ? values.shift() : (reply.mode === "43") ? 'requestdtc' : null;
    var pidForReply = pidKey ? PIDPIDMAP[pidKey] : pidKey;
    if (pidForReply) {
        if (values.length === 1) values = values.shift();
        reply.value = pidForReply.convertToUseful(values);
        reply.name = pidForReply.name;
        if (pidForReply.pid) reply.pid = pidForReply.pid;
    }
    return reply;
};

module.exports = OBDStream;
