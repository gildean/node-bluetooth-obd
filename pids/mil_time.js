var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "4D", bytes: 2, name: "mil_time", description: "Time run by the engine while MIL activated", min: 0, max: 65525, unit: "minutes", convertToUseful: helpers.bitDecoder};
