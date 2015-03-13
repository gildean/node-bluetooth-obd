var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "0E", bytes: 1, name: "sparkadv", description: "Ignition Timing Advance for #1 Cylinder", min: -64, max: 63.5, unit: "degrees relative to #1 cylinder", convertToUseful: helpers.convertSparkAdvance};
