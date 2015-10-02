var Memcached = require('memcached');

function build(conf) {
  return new Memcached(conf.hostname, {retries: 5, failures: 5 ,retry: 6000});
}

module.exports.build = build;