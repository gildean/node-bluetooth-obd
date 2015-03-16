var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "50",
    bytes: 4,
    name: "exttest2",
    description: "External Test Equipment Configuration #2",
    min: 0,
    max: 0,
    unit: "Bit Encoded",
    convertToUseful: helpers.bitDecoder
};
