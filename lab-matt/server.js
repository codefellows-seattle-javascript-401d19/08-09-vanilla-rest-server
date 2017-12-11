'use strict';

// =========== REQUIRE ===========
const log = require('./lib/logger');
const http = require('http');
const router = require('./route/router');
const fs = require('fs');

if (!fs.existsSync('./logs')) {
  fs.mkdir('./logs');
}
require('dotenv').config();
require('./lib/dog-router');

// =========== SERVER ===========
const app = http.createServer(router.route);

let isServerOn = false;

// =========== START/STOP SERVER ===========
const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if (isServerOn) {
      log('error', '__SERVER_ERROR__ server is already running');
      return reject(new Error('__SERVER_ERROR__ server is already running'));
    }

    if (!process.env.PORT) {
      log('error', '__SERVER_ERROR__ PORT is not defined');
      return reject(new Error('__SERVER_ERROR__ PORT is not defined'));
    }

    app.listen(process.env.PORT, error => {
      if (error)
        return reject(error);

      isServerOn = true;
      log('info', `Server is online on port ${process.env.PORT}`);
      console.log('info', `Server is online on port ${process.env.PORT}`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!isServerOn) {
      log('error', '__SERVER_ERROR__ server is already off');
      return reject(new Error('__SERVER_ERROR__ server is already off'));
    }

    app.close(error => {
      if (error) {
        log('error', '__SERVER_ERROR__ server cannot be shut down');
        return reject(error);
      }

      isServerOn = false;
      return resolve();
    });
  });
};
