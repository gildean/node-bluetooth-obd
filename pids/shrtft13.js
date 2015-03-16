var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "06",
    bytes: 1,
    name: "shrtft13",
    description: "Short Term Fuel Trim - Bank 1,3",
    min: -100,
    max: 99.22,
    unit: "%",
    convertToUseful: helpers.convertFuelTrim
};
