var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "1E", bytes: 1, name: "pto_stat", description: "Auxiliary Input Status", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: helpers.bitDecoder};
