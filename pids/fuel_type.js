var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "51",
    bytes: 2,
    name: "fuel_type",
    description: "Fuel Type",
    min: 0,
    max: 0,
    unit: "Bit Encoded",
    convertToUseful: helpers.bitDecoder
};
