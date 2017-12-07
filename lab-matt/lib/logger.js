'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({
      filename: './logs/log.json',
    }),
    new (winston.transports.Console)({
    }),
  ],
});

let log = (method, text) => {
  logger.log(method, text);
}

module.exports = log;