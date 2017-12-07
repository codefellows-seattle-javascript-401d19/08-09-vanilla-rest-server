'use strict';

const Planet = require('../model/planet');
const router = require('../lib/router');
const logger = require('../lib/logger');

let planets = [];

let sendStatus = (response,status,message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response,status,jsonData) => {
  logger.log('info',`Responding with a ${status} code and the following data`);
  logger.log('info',jsonData);
  response.writeHead(status,{
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

//           URL           CALLBACK
router.post('/api/planet', (request,response) => {
  // Here, I know that my request has been pre-parsed
  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response,400,'name not found');
    return;
  }
  if(!request.body.content){
    sendStatus(response,400,'content not found');
    return;
  }
  //can create my planet since all test pass
  let planet = new Planet(request.body.name,request.body.content);
  planets.push(planet);
  sendJSON(response,200,planet);
});
