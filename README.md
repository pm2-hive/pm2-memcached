# pm2-memcached
Memcached module for Keymetrics

![pm2-memcached screenshot](https://raw.githubusercontent.com/pm2-hive/pm2-memcached/master/pm2-memcached.jpg)

## Description

PM2 module to monitor key Memcached server metrics:

*
*
*

## Requirements

This module requires a Memcached install (tested against v1.4.14).

## Install

```bash
$ npm install pm2 -g

$ pm2 install pm2-memcached
```

## Config

The default connection details are :
"hostname": "localhost:11211"


To modify the config values you can use the commands:
```bash
$ pm2 set pm2-memcached:hostname  a.b.c.d:port
```

## Uninstall

```bash
$ pm2 uninstall pm2-memcached
```

# License

MIT
