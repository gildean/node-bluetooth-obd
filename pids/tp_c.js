var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "48",
    bytes: 1,
    name: "tp_c",
    description: "Absolute Throttle Position C",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
