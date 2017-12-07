'use strict';

const Sweet = require(`../model/sweet`);
const router = require(`../lib/router`);
const logger = require(`../lib/logger`);

let sweets = [];

let sendStatus = (response, status, message) => {
  logger.log(`info`, `Sending status: ${status}`);

  response.writeHead(status);   //only status code is required for writeHead()
  response.end();
  return;
};

let sendJSON = (response, status, jsonData) => {
  logger.log(`info`, `Sending JSON! ${jsonData}`);

  response.writeHead(status, {
    'Content-Type' : 'application/json'
  });
  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post(`/api/sweets`, (request, response) => {
  if(!request.body.name){
    return sendStatus(response, 400, 'A sweet has no name');
  }

  if(!request.body.hasChocolate){
    return sendStatus(response, 400, 'Does the sweet have chocolate? Yes or no, man!');
  }

  if(!request.body.temperature){
    return sendStatus(response, 400, 'Could not find the temperature of the sweet :(');
  }

  sweet = new Sweet(request.body.name, request.body.hasChocolate, request.body.temperature);
  sweets.push(sweet);

  sendJSON(response, 200, sweet);
});

router.get(`/api/sweets`, (request, response) => {
  

  sendJSON(response, 200, sweets);
});
