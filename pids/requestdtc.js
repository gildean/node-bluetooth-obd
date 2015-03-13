var helpers = require('../helpers');
module.exports = {mode: helpers.modeRequestDTC, pid: undefined, bytes: 6, name: "requestdtc", description: "Requested DTC", convertToUseful: helpers.convertDTCRequest};
