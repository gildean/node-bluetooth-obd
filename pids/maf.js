var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "10",
    bytes: 2,
    name: "maf",
    description: "Air Flow Rate from Mass Air Flow Sensor",
    min: 0,
    max: 655.35,
    unit: "g/s",
    convertToUseful: helpers.convertAirFlowRate
};
