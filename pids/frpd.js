var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "23",
    bytes: 2,
    name: "frpd",
    description: "Fuel Rail Pressure (diesel)",
    min: 0,
    max: 655350,
    unit: "kPa",
    convertToUseful: helpers.bitDecoder
};
