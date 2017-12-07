'use strict';

const Wizard = require('../model/wizard');
const router = require('../lib/router');
const logger = require('../lib/logger');

let wizards = [];

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
  
  router.post('/api/wizards', (request,response) => {
    // Here, I know that my request has been pre-parsed
    if(!request.body){
      sendStatus(response,400,'body not found');
      return;
    }
    if(!request.body.name){
      sendStatus(response,400,'title not found');
      return;
    }
    if(!request.body.origin){
      sendStatus(response,400,'content not found');
      return;
    }
    
    let wizard = new Wizard(request.body.title, request.body.content);
    wizards.push(wizard);
    sendJSON(response,200,wizard);
  });