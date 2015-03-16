var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "2E",
    bytes: 1,
    name: "evap_pct",
    description: "Commanded Evaporative Purge",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
