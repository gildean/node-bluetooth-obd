var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "0A",
    bytes: 1,
    name: "frp",
    description: "Fuel Rail Pressure (gauge)",
    min: -100,
    max: 99.22,
    unit: "%",
    convertToUseful: helpers.convertFuelRailPressure
};
