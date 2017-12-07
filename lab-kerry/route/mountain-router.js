'use strict';

const Mountain = require('../model/mountain');
const router = require('../lib/router');
const logger = require('../lib/logger');

let mountains = [];

let sendStatus = (response, status, message) => {
  logger.log('info', `Responding with a ${status} code due to ${message}.`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response, status, jsonData) => {
  logger.log('info', `Responding with a ${status} code and the following data.`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type' : 'application/json',
  });
  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post('/api/mountains', (request, response) => {
  //Here I know that my request has been pre-parsed (?)
  if (!request.body) {
    sendStatus(response, 400, 'body not found');
    return;
  }

  if (!request.body.name) {
    sendStatus(response, 400, 'title not found');
    return;
  }

  if (!request.body.location) {
    sendStatus(response, 400, 'content not found');
    return;
  }

  if (!request.body.elevation) {
    sendStatus(response, 400, 'content not found');
    return;
  }

  let mountain = new Mountain(request.body.name, request.body.location, request.body.elevation);
  mountains.push(mountain);
  sendJSON(response, 200, mountain);
});

// router.get('/api/mountains', (request, response) => {
//   sendJSON(response, 200, mountains);
//   console.log('get', mountains);
// });

router.get('/api/mountains', (request, response) => {
  if(request.url.query.id) {
    let oneMountain;
    for (let mountain of mountains) {
      if (request.url.query.id === mountain.id)
        oneMountain = mountain;
        break;
    }
  }
  sendJSON(response, 200, mountains);
  console.log('get', mountains);
});