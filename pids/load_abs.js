var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "43",
    bytes: 2,
    name: "load_abs",
    description: "Absolute Load Value",
    min: 0,
    max: 25700,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
