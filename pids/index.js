var PIDS = require('fs').readdirSync(__dirname + '/').reduce(function (arr, file) {
  if (/.+\.js$/.test(file) && file !== 'index.js') arr.push(require('./' + file));
  return arr;
}, []);
var PIDNAMEMAP = {};
var PIDPIDMAP = PIDS.reduce(function (obj, pid) {
    var key, id;
    if (pid.pid) {
        id = pid.mode + pid.pid;
        key = pid.pid;
    } else {
        id = pid.mode;
        key = pid.name;
    }
    obj[key] = pid;
    PIDNAMEMAP[pid.name] = id;
    return obj;
}, {});

module.exports = {
    PIDS: PIDS,
    PIDPIDMAP: PIDPIDMAP,
    PIDNAMEMAP: PIDNAMEMAP
};
