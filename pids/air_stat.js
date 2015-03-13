var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "12", bytes: 1, name: "air_stat", description: "Commanded Secondary Air Status", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: helpers.bitDecoder};
