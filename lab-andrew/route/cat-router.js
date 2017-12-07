'use strict';

const Cat = require('../model/cat');
const router = require('../lib/router');
const logger = require('../lib/logger');

let cats = [];

let sendStatus = (response, status, message) => {
  logger.log('info', `Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response, status, jsonData) => {
  logger.log('info', `Responding with a ${status} code and the following data`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

//           URL           CALLBACK
router.post('/api/cats', (request, response) => {

  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response, 400, 'name not found');
    return;
  }
  if(!request.body.says){
    sendStatus(response, 400, 'says not found');
    return;
  }
  let cat = new Cat(request.body.name, request.body.says);
  cats.push(cat);
  sendJSON(response, 200, cat);
});

router.get('/api/cats', (request, response) => {
  if (request.url.query.id){
    let specificCat;
    for (let cat of cats){
      if (request.url.query.id === cat.id){
        specificCat = cat;
        break;
      }
    }
    if (!specificCat){
      sendStatus(response, 404, 'id not found');
      return;
    }
    sendJSON(response, 200, specificCat);
  } else {
    sendJSON(response, 200, cats);
  }
});
