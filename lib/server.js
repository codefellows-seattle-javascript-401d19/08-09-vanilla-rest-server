'use strict';

require('dotenv').config();

const server = module.exports = {};

const logger = require(`./logger`);
const http = require(`http`);
const router = require(`./router`);

const app = http.createServer(router.route);

require(`../route/sweet-router`);

let serverIsOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(serverIsOn){
      logger.log(`error`, `---SERVER_ERROR: server is already running`);
      return reject(new Error (`---SERVER_ERROR: server is already running`));
    }
    if(!process.env.PORT){
      logger.log(`error`, `Please configure the PORT variable before proceeding`);
      return reject(new Error(`Please configure the PORT variable before proceeding`));
    }

    app.listen(process.env.PORT, error => {
      if(error){
        logger.log(`error`, error);
        return reject(error);
      }

      serverIsOn = true;
      logger.log(`info`, `The server is now running on port ${process.env.PORT}`);
      console.log(`The server is now running on port ${process.env.PORT}`);

      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!serverIsOn){
      logger.log(`info`, `The server is already off`);

      return reject(new Error (`The server is already off`));
    }
    app.close(error => {
      if(error){
        logger.log(`error`, `The server is unstoppable!`);

        return reject(new Error(`The server is unstoppable!`));
      }

      serverIsOn = false;

      return resolve();
    });
  });
};
