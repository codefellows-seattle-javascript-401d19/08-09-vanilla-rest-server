'use strict';

require('dotenv').config();

const server = require('./lib/server');
const logger = require('./lib/logger');

server.start()
  .then(console.log('Success!'))
  .catch(error => {
    logger.log('error', error);
    console.log(err);
  });
