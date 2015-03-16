var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "44",
    bytes: 2,
    name: "lambda",
    description: "Fuel/air Commanded Equivalence Ratio",
    min: 0,
    max: 2,
    unit: "(ratio)",
    convertToUseful: helpers.bitDecoder
};
