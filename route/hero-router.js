'use strict';

const Hero = require('../model/hero.js');
const router = require('../lib/router');
const logger = require('../lib/logger');

let heroes = [];

let sendStatus = (response, status, message) => {
  logger.log('info', `Responding with a ${status} code due to the ${message}`);

  response.writeHead(status);
  response.end();
  return;
};

let sendJSON = (response, status, jsonData) => {
  logger.log('info', `Responding with a ${status} code and following data`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post('/api/notes', (request, response) => {
  // Here my REQUEST has been pre-parsed
  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response, 400, 'hero not found');
    return;
  }
  if(!request.body.superPower){
    sendStatus(response, 400, 'hero superPower not found');
    return;
  }

  //here creating HERO since all test pass

  let hero = new Hero(request.body.name, request.body.superPower);
  heroes.push(hero);
  sendJSON(response, 200, hero);
});
