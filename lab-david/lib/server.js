'use strict'; 

const http = require('http');
const logger = require('./logger');
const router = require('./router');

process.env.PORT = 3000;

require('../route/note-router');