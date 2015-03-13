var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "13", bytes: 1, name: "o2sloc", description: "Location of Oxygen Sensors", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: helpers.bitDecoder};
