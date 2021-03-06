var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "3B",
    bytes: 4,
    name: "lambdac24",
    description: "Bank 2 - Sensor 4/Bank 4 - Sensor 2 (wide range O2S) Oxygen Sensors Equivalence Ratio (lambda) / Current",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
