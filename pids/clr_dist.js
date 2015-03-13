var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "31", bytes: 2, name: "clr_dist", description: "Distance since diagnostic trouble codes cleared", min: 0, max: 65535, unit: "km", convertToUseful: helpers.bitDecoder};
