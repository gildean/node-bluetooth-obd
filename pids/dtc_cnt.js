var helpers = require('../helpers');
module.exports = {mode: helpers.modeRealTime, pid: "01", bytes: 4, name: "dtc_cnt", description: "Monitor status since DTCs cleared", min: 0, max: 0, unit: "Bit Encoded", convertToUseful: helpers.convertDTCCheck};
