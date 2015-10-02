var pmx = require('pmx');
var humanize = require('humanize');
var moment = require('moment');
require("moment-duration-format");

var metrics = {};
var REFRESH_RATE = 5000; // ms
var probe = pmx.probe();

// Init metrics with default values
function initMetrics() {
  metrics.memcachedVersion = probe.metric({
    name: 'Memcached Version',
    value: 'N/A'
  });
  metrics.pid = probe.metric({
    name: 'Process ID',
    value: 'N/A'
  });
  metrics.uptime = probe.metric({
    name: 'Uptime',
    value: 'N/A'
  });
  metrics.acceptingConns = probe.metric({
    name: 'Accepting Conns',
    value: 'N/A',
    alert: {
      mode: 'threshold-avg',
      value: 0,
      msg: 'Not Accepting connections',
      cmp: "="
    }
  });
  metrics.threads = probe.metric({
    name: 'Threads',
    value: 'N/A'
  });
  metrics.currItems = probe.metric({
    name: 'Curr. Items',
    value: 'N/A',
    alert: {
      mode: 'threshold-avg',
      value: 1000000,
      msg: 'Too many items stored',
      cmp: ">"
    }
  });
  metrics.totalItems = probe.metric({
    name: 'Tot. Items',
    value: 'N/A'
  });
  metrics.currConnections = probe.metric({
    name: 'Curr. Connections',
    value: 'N/A'
  });
  metrics.getHits = probe.metric({
    name: 'Get Hits',
    value: 'N/A'
  });
  metrics.getMisses = probe.metric({
    name: 'Get Misses',
    value: 'N/A'
  });
  metrics.bytesRead = probe.metric({
    name: 'Bytes Read',
    value: 'N/A'
  });
  metrics.bytesWritten = probe.metric({
    name: 'Bytes Written',
    value: 'N/A'
  });
}

// Refresh metrics
function refreshMetrics(memcachedClient) {
  memcachedClient.stats(function (err, results) {
    if (err) {
      return pmx.notify("Couldn't connect to Memcached: " + err);
    }

    var stats = results[0];

    // Memcached version
    metrics.memcachedVersion.set(stats.version);

    // PID
    metrics.pid.set(stats.pid);

    // Uptime
    var uptime;
    if (stats.uptime) {
      uptime = moment.duration(stats.uptime, "seconds").format("d[d] h[h] m[m]");
    }
    else {
      uptime = 'N/A';
    }
    metrics.uptime.set(uptime);

    // Accepting connnections ?
    var acceptingConns = (stats.accepting_conns === 1 ? 'Yes' : 'No');
    metrics.acceptingConns.set(acceptingConns);

    // # of Threads
    metrics.threads.set(stats.threads);

    // # of Current Items
    metrics.currItems.set(stats.curr_items);

    // # of Total Items
    metrics.totalItems.set(stats.total_items);

    // # of Current Connections
    metrics.currConnections.set(stats.curr_connections);

    // # of Get Hits
    metrics.getHits.set(stats.get_hits);

    // # of Get Misses
    metrics.getMisses.set(stats.get_misses);

    // Bytes Read
    var bytesRead = stats.bytes_read ? humanize.filesize(stats.bytes_read) : 'N/A';
    metrics.bytesRead.set(bytesRead);

    // Bytes Written
    var bytesWritten = stats.bytes_written ? humanize.filesize(stats.bytes_written) : 'N/A';
    metrics.bytesWritten.set(bytesWritten);
  });
}

function init(memcachedClient) {
  initMetrics();
  setInterval(refreshMetrics.bind(this, memcachedClient), REFRESH_RATE);
}

module.exports.init = init;
