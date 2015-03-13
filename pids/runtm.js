var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "1F", bytes: 2, name: "runtm", description: "Time Since Engine Start", min: 0, max: 65535, unit: "seconds", convertToUseful: helpers.bitDecoder};
