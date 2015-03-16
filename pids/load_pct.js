var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "04",
    bytes: 2,
    name: "load_pct",
    description: "Calculated LOAD Value",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.convertLoad
};
