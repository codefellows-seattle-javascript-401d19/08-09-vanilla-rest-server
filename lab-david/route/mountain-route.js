'use strict';

const Note = require('..model/mountain');
const router = require('..lib/router');
const logger = require('../lib/logger');

let mountains = [];

let sendStatus = (response,status,message) => {
  logger.log('info', `Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response,status,jsonData) => {
  logger.log('info', `responding with a ${status} code and the following json data`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post('api/mountains', (request, response) =>  {
  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response,400,'name not found');
    return;
  }
  if(!request.body.state){
    sendStatus(response,400,'state not found');
    return;
  }
  if(!request.body.hiking){
    sendStatus(response,400,'hiking info not found');
    return;
  }
  if(!request.body.range){
    sendStatus(response,400,'range name not found');
    return;
  }
  let mountain = new mountain(request.body.name,request.body.state,request.body.hiking,request.body.range);
  mountains.push(mountain);
  sendJSON(response,200,mountain);
});