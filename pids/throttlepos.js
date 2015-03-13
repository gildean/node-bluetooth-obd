var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "11", bytes: 1, name: "throttlepos", description: "Absolute Throttle Position", min: 1, max: 100, unit: "%", convertToUseful: helpers.convertThrottlePos};
