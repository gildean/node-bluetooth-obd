var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "0B",
    bytes: 1,
    name: "map",
    description: "Intake Manifold Absolute Pressure",
    min: 0,
    max: 765,
    unit: "kPa",
    convertToUseful: helpers.convertIntakePressure
};
