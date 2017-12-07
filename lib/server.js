'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');

process.env.PORT = 3000;

require('../route/hero-router');

const app = http.createServer(router.route);

let isServerOn = false;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if(isServerOn){
      logger.log('error', '__SERVER_ERROR__ server is already running');
      return reject(new Error('__SERVER_ERROR__ server is already running'));
    }
    if(!process.env.PORT){
      logger.log('error', '__SERVER_ERROR__ PORT variable is not configured');
      return reject(new Error('__SERVER_ERROR__ PORT varialble is not configured'));
    }
    app.listen(process.env.PORT, error => {
      if(error)
        return reject(error);

      isServerOn = true;
      logger.log('info', `Server is online on port ${process.env.PORT}`);
      console.log(`Server is online on port ${process.env.PORT}`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!isServerOn){
      logger.log('error', '__SERVER_ERROR__ server is already off');
      return reject(new Error('__SERVER_ERROR__ server is already off'));
    }
    app.close(error => {
      if(error){
        logger.log('error', `__SERVER_ERROR__ server can't be shut down`);
        logger.log('error', error);
        return reject(error);
      }
      isServerOn = false;
      return resolve();
    });
  });
};
