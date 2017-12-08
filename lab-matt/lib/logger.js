'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
  levels: { error: 1, debug: 2, verbose: 3, info: 4, silly: 5 },

  transports: [
    new (winston.transports.File)({
      filename: './logs/log.json',
      level: 'silly',  // logs ALL
    }),
    new (winston.transports.Console)({
      level: 'verbose', // logs 'error' 
    }),
  ],
});

const server = new (winston.Logger)({
  levels: { router: 0 },
  
  transports: [
    new (winston.transports.File)({
      filename: './logs/router.json',
      level: 'router',  // logs ALL
    }),
  ],
});

let log = (method, text) => {
  logger.log(method, text);
  server.log(method, text);
};

module.exports = log;