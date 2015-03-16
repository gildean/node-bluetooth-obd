var helpers = require('../helpers');
module.exports = {
    mode: helpers.modeRealTime,
    pid: "49",
    bytes: 1,
    name: "app_d",
    description: "Accelerator Pedal Position D",
    min: 0,
    max: 100,
    unit: "%",
    convertToUseful: helpers.bitDecoder
};
