'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');
require('dotenv').config();

//--------------------------------------------------------
//  Registering Note Router
//--------------------------------------------------------
require('../route/mountain-router');
//--------------------------------------------------------

const app = http.createServer(router.route);

let isServerOn = false;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if (isServerOn) {
      logger.log('error', '__SERVER_ERROR__ Se3rver is already running');
      return reject(new Error('__SERVER_ERROR__ Server is already running'));
    }
    if (!process.env.PORT) {
      logger.log('error', '__SERVER_ERROR__ PORT variable is not configured');
      return reject(new Error('__SERVER_ERROR__ PORT variable is not configured'));
    }
    app.listen(process.env.PORT, error => {
      if(error)
        return reject(error);
      //if we are at this point, everything is ok
      isServerOn = true;
      logger.log('info', `Server is online at port ${process.env.PORT}`);
      console.log('info', `Server is online at port ${process.env.PORT}`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!isServerOn) {
      logger.log('error', '__SERVER_ERROR__ Server is already off');
      return reject(new Error('__SERVER_ERROR__ Server is already off'));
    }
    app.close(error => {
      if(error) {
        logger.log('error', `__SERVER_ERROR__ Server can't be shut down`);
       
        return reject(error);
      }
      isServerOn = false;
      return resolve();
    });
  });
};