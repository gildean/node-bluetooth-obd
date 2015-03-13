var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "18", bytes: 2, name: "o2s21", description: "Bank 2 - Sensor 1/Bank 3 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim", min: 0, max: 1.275, unit: "V", convertToUseful: helpers.convertOxygenSensorOutput};
