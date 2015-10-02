var Memcached = require('memcached');

function build(conf) {
  return new Memcached(conf.hostname);
}

module.exports.build = build;