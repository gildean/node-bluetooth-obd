var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeVin,
    pid: "00",
    bytes: 4,
    name: "vinsupp0",
    description: "Vehicle Identification Number",
    convertToUseful: helpers.bitDecoder
};
