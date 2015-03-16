var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "41",
    bytes: 4,
    name: "monitorstat",
    description: "Monitor status this driving cycle",
    min: 0,
    max: 0,
    unit: "Bit Encoded",
    convertToUseful: helpers.bitDecoder
};
