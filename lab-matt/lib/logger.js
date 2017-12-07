'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: './logs/log.json',
      levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 },
    }),
    new (winston.transports.Console)({
      level: 'error',
    }),
  ],
});

let log = (method, text) => {
  logger.log(method, text);
};

module.exports = log;