var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "1B",
    bytes: 2,
    name: "o2s24",
    description: "Bank 2 - Sensor 4/Bank 4 - Sensor 2 Oxygen Sensor Output Voltage / Short Term Fuel Trim",
    min: 0,
    max: 1.275,
    unit: "V",
    convertToUseful: helpers.convertOxygenSensorOutput
};
