var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "08", bytes: 1, name: "shrtft24", description: "Short Term Fuel Trim - Bank 2,4", min: -100, max: 99.22, unit: "%", convertToUseful: helpers.convertFuelTrim};
