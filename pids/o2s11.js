var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "14",
    bytes: 2,
    name: "o2s11",
    description: "Bank 1 - Sensor 1/Bank 1 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim",
    min: 0,
    max: 1.275,
    unit: "V",
    convertToUseful: helpers.convertOxygenSensorOutput
};
