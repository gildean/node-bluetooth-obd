var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "4E",
    bytes: 2,
    name: "clr_time",
    description: "Time since diagnostic trouble codes cleared",
    min: 0,
    max: 65535,
    unit: "minutes",
    convertToUseful: helpers.bitDecoder
};
