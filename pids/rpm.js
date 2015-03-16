var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "0C",
    bytes: 2,
    name: "rpm",
    description: "Engine RPM",
    min: 0,
    max: 16383.75,
    unit: "rev/min",
    convertToUseful: helpers.convertRPM
};
