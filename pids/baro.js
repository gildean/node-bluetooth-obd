var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "33", bytes: 1, name: "baro", description: "Barometric Pressure", min: 0, max: 255, unit: "kPa", convertToUseful: helpers.bitDecoder};
