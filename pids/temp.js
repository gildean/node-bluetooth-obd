var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "05", bytes: 1, name: "temp", description: "Engine Coolant Temperature", min: -40, max: 215, unit: "Celsius", convertToUseful: helpers.convertTemp};
