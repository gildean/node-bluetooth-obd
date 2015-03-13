var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "17", bytes: 2, name: "o2s14", description: "Bank 1 - Sensor 4/Bank 2 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: helpers.convertOxygenSensorOutput};
