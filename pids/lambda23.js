var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "2A",
    bytes: 4,
    name: "lambda23",
    description: "Bank 2 - Sensor 3 /Bank 4 - Sensor 1(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
