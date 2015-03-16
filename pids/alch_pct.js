var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "52",
    bytes: 2,
    name: "alch_pct",
    description: "Ethanol fuel %",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
