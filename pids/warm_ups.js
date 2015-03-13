var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "30", bytes: 1, name: "warm_ups", description: "Number of warm-ups since diagnostic trouble codes cleared", min: 0, max: 255, unit: "", convertToUseful: helpers.bitDecoder};
