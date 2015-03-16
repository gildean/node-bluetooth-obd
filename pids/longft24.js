var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "09",
    bytes: 1,
    name: "longft24",
    description: "Long Term Fuel Trim - Bank 2,4",
    min: -100,
    max: 99.22,
    unit: "%",
    convertToUseful: helpers.convertFuelTrim
};
