var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "36",
    bytes: 4,
    name: "lambdac13",
    description: "Bank 1 - Sensor 3/Bank 2 - Sensor 1 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
