var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "4C", bytes: 1, name: "tac_pct", description: "Commanded Throttle Actuator Control", min: 0, max: 100, unit: "%", convertToUseful: helpers.bitDecoder};
