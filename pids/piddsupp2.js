var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "20",
    bytes: 4,
    name: "piddsupp2",
    description: "PIDs supported 21-40",
    min: 0,
    max: 0,
    unit: "Bit Encoded",
    convertToUseful: helpers.bitDecoder
};
