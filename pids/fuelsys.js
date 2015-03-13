var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "03", bytes: 8, name: "fuelsys", description: "Fuel system 1 and 2 status", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: helpers.bitDecoder};
