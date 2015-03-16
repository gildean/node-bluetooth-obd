var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "1A",
    bytes: 2,
    name: "o2s23",
    description: "Bank 2 - Sensor 3/Bank 4 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim",
    min: 0,
    max: 1.275,
    unit: "V",
    convertToUseful: helpers.convertOxygenSensorOutput
};
