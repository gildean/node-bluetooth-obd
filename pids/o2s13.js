var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "16",
    bytes: 2,
    name: "o2s13",
    description: "Bank 1 - Sensor 3/Bank 2 - Sensor 1 Oxygen Sensor Output Voltage / Short Term Fuel Trim",
    min: 0,
    max: 1.275,
    unit: "V",
    convertToUseful: helpers.convertOxygenSensorOutput
};
