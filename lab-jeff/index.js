'use strict';

require('dotenv').config();
const server = require('./lib/server');

server.start(process.env.PORT, () => {
  
});
