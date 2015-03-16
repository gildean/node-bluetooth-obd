var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "45",
    bytes: 1,
    name: "tp_r",
    description: "Relative Throttle Position",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
