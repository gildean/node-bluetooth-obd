var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "38",
    bytes: 4,
    name: "lambdac21",
    description: "Bank 2 - Sensor 1/Bank 3 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
