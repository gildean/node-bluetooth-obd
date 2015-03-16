var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "4B",
    bytes: 1,
    name: "app_f",
    description: "Accelerator Pedal Position F",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
