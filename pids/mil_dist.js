var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "21",
    bytes: 4,
    name: "mil_dist",
    description: "Distance Travelled While MIL is Activated",
    min: 0,
    max: 65535,
    unit: "km",
    convertToUseful: helpers.bitDecoder
};
