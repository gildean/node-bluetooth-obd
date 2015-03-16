var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "29",
    bytes: 4,
    name: "lambda22",
    description: "Bank 2 - Sensor 2 /Bank 3 - Sensor 2(wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Voltage",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
