var pmx = require('pmx');

function initActions(memcachedClient) {

  // Flush memcached server
  pmx.action('Flush', function (reply) {
    memcachedClient.flush(function (err) {
      if (err) {
        return reply(err);
      }

      reply("Server flushed successfully");
    })
  });

  // Show Settings
  pmx.action('Show Settings', function (reply) {
    memcachedClient.settings(function (err, results) {
      if (err) {
        return reply(err);
      }

      var settings = results[0];
      reply(settings);
    })
  });
}

function init(memcachedClient) {
  initActions(memcachedClient);
}

module.exports.init = init;