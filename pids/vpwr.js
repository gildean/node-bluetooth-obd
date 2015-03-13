var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "42", bytes: 2, name: "vpwr", description: "Control module voltage", min: 0, max: 65535, unit: "V", convertToUseful: helpers.bitDecoder};
