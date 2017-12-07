'use strict';

const Mountain = require('../model/mountain');
const router = require('../lib/router');
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

let getMountainById = id => {
  return mountains.filter(mountains => mountains.id === id)[0];
};

let deleteMountainById = id => {
  let indexOfId = mountains
    .map(mountain => mountain.id)
    .indexOf(id);

  if(indexOfId < 0)
    return false;
  else {
    mountains = mountains.slice(0, indexOfId).concat(mountains.splice(indexOfId + 1));
    return true;
  }
};

router.post('/api/mountains', (request, response) =>  {
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
  let mountain = new Mountain(
    request.body.name,
    request.body.state,
    request.body.hiking,
    request.body.range
  );

  mountains.push(mountain);
  sendJSON(response,200,mountain);
});

router.get('/api/mountains', (request, response) =>  {
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
  let id = request.url.query.id;

  if(id) {
    let requestMountain = getMountainById(id);
    if(requestMountain)
      sendJSON(request, 200, requestMountain);
    else
      sendStatus(response, 404, `no mountain found with the id of ${id}`);
  } else
    sendJSON(response, 200, mountains);
});

router.delete('/api/mountains', (request, response) => {
  let id = request.url.query.id;
  if(id) {
    let deletedMountain = deleteMountainById(id);
    if (deletedMountain) {
      logger.log('info', `Mountain deleted, responding with a 200 success code`);
      response.writeHead(200);
      response.end();
    } else
      sendStatus(response, 404, `No mountain was found with an id ${id}`);
  } else 
    sendStatus(response, 400, `something else occurred - bad request.`);
});
