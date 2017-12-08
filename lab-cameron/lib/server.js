'use strict';

require('dotenv').config();

const http = require('http');
const logger = require('./logger');
const router = require('./router');

const PORT = process.env.PORT;

require('../route/user-router');

const app = http.createServer(router.route);

let isServerOn = false;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if (isServerOn) {
      logger.log('error', '__SERVER_ERROR__ server is already running');
      return reject(new Error('__SERVER_ERROR__ server is already running'));
    }
    if (!PORT) {
      logger.log('error', '__SERVER_ERROR__ PORT is not configured');
      return reject(new Error('__SERVER_ERROR__ PORT is not configured'));
    }
    app.listen(PORT, error => {
      if (error) {
        return reject(error);
      }

      isServerOn = true;
      logger.log('info', `Server is online on port ${process.env.PORT}`);
      console.log(`Server is online on port ${process.env.PORT}`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if (!isServerOn) {
      logger.log('error', '__SERVER_ERROR__ server is already off');
      return reject(new Error('__SERVER_ERROR__ server is already off'));
    }
    app.close(error => {
      if (!isServerOn) {
        logger.log('error', '__SERVER_ERROR__ server is already off');
        logger.log('error', error);

        return reject(error);
      }
      isServerOn = false;
      return resolve();
    });
  });
};
