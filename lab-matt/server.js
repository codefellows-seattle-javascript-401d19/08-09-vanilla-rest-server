'use strict';

const log = require('./lib/logger');
const http = require('http');
const router = require('router');

require('./lib/note-router');

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

    
  });
}


// log('info', 'this has worked!');