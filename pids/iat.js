var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "0F", bytes: 1, name: "iat", description: "Intake Air Temperature", min: -40, max: 215, unit: "Celsius", convertToUseful: helpers.convertTemp};
