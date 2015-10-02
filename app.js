var pmx = require('pmx');
var memcachedClientFactory = require('./lib/clientFactory.js');
var memcachedStats = require('./lib/stats.js');
var memcachedActions = require('./lib/actions.js');

pmx.initModule({

  pid: pmx.resolvePidPaths(['/var/run/memcached.pid']),

  // Options related to the display style on Keymetrics
  widget: {


    // Logo displayed
    logo: 'https://raw.githubusercontent.com/ServiceStack/Assets/master/img/livedemos/techstacks/memcached-logo.png',

    // Module colors
    // 0 = main element
    // 1 = secondary
    // 2 = main border
    // 3 = secondary border
    theme: ['#141A1F', '#222222', '#FC6400', '#807C7C'],

    // Section to show / hide
    el: {
      probes: true,
      actions: true
    },

    // Main block to show / hide
    block: {
      actions: true,
      issues: true,
      meta: true,

      // Custom metrics to put in BIG
      main_probes: ['Uptime','Curr. Connections','Curr. Items','Get Hits','Get Misses']
    }

  }

}, function (err, conf) {
  var memcachedClient = memcachedClientFactory.build(conf);

  // Init metrics refresh loop
  memcachedStats.init(memcachedClient);

  // Init actions
  memcachedActions.init(memcachedClient);
});
