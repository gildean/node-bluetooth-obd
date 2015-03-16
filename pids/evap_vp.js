var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "32",
    bytes: 2,
    name: "evap_vp",
    description: "Evap System Vapour Pressure",
    min: -8192,
    max: 8192,
    unit: "Pa",
    convertToUseful: helpers.bitDecoder
};
