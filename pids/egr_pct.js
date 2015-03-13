var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "2C", bytes: 1, name: "egr_pct", description: "Commanded EGR", min: 0, max: 100, unit: "%", convertToUseful: helpers.bitDecoder};
