var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "1C",
    bytes: 1,
    name: "obdsup",
    description: "OBD requirements to which vehicle is designed",
    min: 0,
    max: 0,
    unit: "Bit Encoded",
    convertToUseful: helpers.bitDecoder
};
