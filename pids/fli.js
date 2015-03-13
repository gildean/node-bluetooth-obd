var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "2F", bytes: 1, name: "fli", description: "Fuel Level Input", min: 0, max: 100, unit: "%", convertToUseful: helpers.bitDecoder};
