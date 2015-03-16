var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "47",
    bytes: 1,
    name: "tp_b",
    description: "Absolute Throttle Position B",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
