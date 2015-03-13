var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "22", bytes: 2, name: "frpm", description: "Fuel Rail Pressure relative to manifold vacuum", min: 0, max: 5177.265, unit: "kPa", convertToUseful: helpers.bitDecoder};
