'use strict'; 

const http = require('http');
const logger = require('./logger');
const router = require('./router');

process.env.PORT = 3000;


require('../route/mountain-router');

const app = http.createServer(router.route);

let isServerOn = false;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve, reject) => {
    if(isServerOn){
      logger.log(`error`, `---->SERVER_ERROR<---- server is already running`);
      return reject(new Error(`---->SERVER_ERROR<---- server is already running`));
    }
    if(!process.env.PORT){
      logger.log(`error`, `---->SERVER_ERROR<---- PORT variable is not configured - get on it`);
      return reject(new Error(`---->SERVER_ERROR<---- PORT variable is not configured`));
    }
    app.listen(process.env.PORT, error => {
      if(error)
        return reject(error);

      isServerOn = true;
      logger.log(`info`, `Server is online on port ${process.env.PORT}`);
      console.log(`info`, `server is online on port ${process.env.PORT}`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve,reject) => {
    if(!isServerOn){
      logger.log('error', `---->SERVER_ERROR<---- server is already off dude. go chill`);
      return reject(new Error(`---->SERVER_ERROR<---- server is already off dude. go chill`));
    }
    app.close(error => {
      if(error){
        logger.log(`error`, `---->SERVER_ERROR<---- server can't be shut down; just like skynet`);
        logger.log(`error`, error);

        return reject(error);
      }
      isServerOn = false;
      return resolve();
    });
  });
};