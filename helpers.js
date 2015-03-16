'use strict';

var DTCS = require('./dtc.json');

function bitDecoder(bytes) {
    return parseInt(bytes, 2);
}

function convertDTCCheck(bytesArr) {
    var byteA = bytesArr[0];
    //ByteB, ByteC and ByteD are not read. These bytes are for testing purposes, which is not supported in this module.
    var byteValue, mil, numberOfDTCs, reply;
    byteValue = parseInt(byteA, 16);
    if ((byteValue >> 7) === 1) {
        mil = 1;
    } else {
        mil = 0;
    }
    numberOfDTCs = byteValue % 128;
    reply = {};
    reply.numberOfErrors = numberOfDTCs;
    reply.mil = mil;
    return reply;
}

function decodeFirstChar(firstCharBytes) {
    switch(firstCharBytes) {
        case 0: return 'P';
        case 1: return 'C';
        case 2: return 'B';
        case 3: return 'U';
        default:
            console.log('Error with DTC');
            return null;
    }
}

function decodeDTCCode(byteOne, byteTwo) {
    //If 00 00 --> No code.
    if (byteOne === '00' && byteTwo === '00') return '-';
    var firstByte = parseInt(byteOne, 16);
    var firstCharBytes = firstByte >> 6;
    var firstChar = decodeFirstChar(firstCharBytes);
    if (!firstChar) return null;
    var secondChar = (firstByte >> 4) % 4;
    var thirdChar = firstByte % 16;
    var codeString = firstChar + secondChar + thirdChar + byteTwo;
    return codeString;
}

function convertDTCRequest(bytesArr) {
    var reply = { errors: [] };
    for (var i = 0; i < bytesArr.length; i += 2) reply.errors.push(decodeDTCCode(bytesArr[i], bytesArr[i + 1]));
    return reply;
}

function convertLoad(bytes) {
    return parseInt(bytes, 16) * (100 / 256);
}

function convertTemp(bytes) {
    return parseInt(bytes, 16) - 40;
}

function convertFuelTrim(bytes) {
    return (parseInt(bytes, 16) - 128) * (100 / 128);
}

function convertFuelRailPressure(bytes) {
    return parseInt(bytes, 16) * 3;
}

function convertIntakePressure(bytes) {
    return parseInt(bytes, 16);
}

function convertRPM(bytesArr) {
    var byteA = bytesArr[0];
    var byteB = bytesArr[1];
    return ((parseInt(byteA, 16) * 256) + parseInt(byteB, 16)) / 4;
}

function convertSpeed(bytes) {
    return parseInt(bytes, 16);
}

function convertSparkAdvance(bytes) {
    return (parseInt(bytes, 16) / 2) - 64;
}

function convertAirFlowRate(bytesArr) {
    var byteA = bytesArr[0];
    var byteB = bytesArr[1];
    return (parseInt(byteA, 16) * 256.0) + (parseInt(byteB, 16) / 100);
}

function convertThrottlePos(bytes) {
    return parseInt(bytes, 16) * (100 / 255);
}

function convertOxygenSensorOutput(bytes) {
    return parseInt(bytes, 16) * 0.005;
}

//DTC
function notSupported() {
   console.log('There is no answer. This should not be happening.');
   return;
}
//VIN
function convertVIN(bytesArr) {
    return bytesArr;
}

module.exports = {
    //decoders
    bitDecoder: bitDecoder,
    convertDTCCheck: convertDTCCheck,
    decodeDTCCode: decodeDTCCode,
    convertDTCRequest: convertDTCRequest,
    convertLoad: convertLoad,
    convertTemp: convertTemp,
    convertFuelTrim: convertFuelTrim,
    convertFuelRailPressure: convertFuelRailPressure,
    convertIntakePressure: convertIntakePressure,
    convertRPM: convertRPM,
    convertSpeed: convertSpeed,
    convertSparkAdvance: convertSparkAdvance,
    convertAirFlowRate: convertAirFlowRate,
    convertThrottlePos: convertThrottlePos,
    convertOxygenSensorOutput: convertOxygenSensorOutput,
    notSupported: notSupported,
    convertVIN: convertVIN,
    // modes
    modeRealTime: '01',
    modeRequestDTC: '03',
    modeClearDTC: '04',
    modeVin: '09'
};
