var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "27",
    bytes: 4,
    name: "lambda14",
    description: "Bank 1 - Sensor 4 /Bank 2 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
