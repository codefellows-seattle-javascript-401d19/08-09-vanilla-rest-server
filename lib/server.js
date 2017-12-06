'use strict';

const server = module.exports = {};
const logger = require(`./logger`);
const http = require(`http`);

const app = http.createServer();

let serverIsOn = false;

server.start();

server.stop();
