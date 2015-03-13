var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "0D", bytes: 1, name: "vss", description: "Vehicle Speed Sensor", min: 0, max: 255, unit: "km/h", convertToUseful: helpers.convertSpeed};
