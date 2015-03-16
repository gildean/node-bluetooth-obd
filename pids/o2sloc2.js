var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "1D",
    bytes: 1,
    name: "o2sloc2",
    description: "Location of oxygen sensors",
    min: 0,
    max: 0,
    unit: "Bit Encoded",
    convertToUseful: helpers.bitDecoder
};
