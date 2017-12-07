'use strict';

require('dotenv').config();

const server = require('./lib/server.js');

server.start(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});

//-------------------------------------------------------
