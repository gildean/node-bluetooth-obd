var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "3E",
    bytes: 2,
    name: "catemp12",
    description: "Catalyst Temperature Bank 1 / Sensor 2",
    min: -40,
    max: 6513.5,
    unit: "Celsius",
    convertToUseful: helpers.bitDecoder
};
