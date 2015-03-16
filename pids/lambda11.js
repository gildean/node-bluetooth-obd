var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "24",
    bytes: 4,
    name: "lambda11",
    description: "Bank 1 - Sensor 1/Bank 1 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
