var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "2D",
    bytes: 1,
    name: "egr_err",
    description: "EGR Error",
    min: -100,
    max: 99.22,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
