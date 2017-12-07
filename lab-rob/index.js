'use strict';

const server = require('./lib/server');
const logger = require('./lib/logger');

server.start()
  .then(PORT => console.log(`The server is running on port ${PORT}`))
  .catch(err => {
    console.log(err);
    logger.log('error', err);
  });