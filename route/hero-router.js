'use strict';

const Hero = require('../model/hero.js');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

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

  //-------- POST REQUEST ----------------

router.post('/api/heroes', (request, response) => {
  if(!request.body){
    sendStatus(response, 400, 'body of hero not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response, 400, 'hero\'s name not found');
    return;
  }
  if(!request.body.superPower){
    sendStatus(response, 400, 'hero\'s superPower not found');
    return;
  }

  let hero = new Hero(request.body.name, request.body.superPower);
  storage.addItem(hero)
    .then(() => {
      sendJSON(response, 200, hero);
    })
    .catch(error => {
      sendStatus(response, 500, error);
    });
});

//-------- GET REQUEST with storage -------------

router.get('/api/heroes', (request, response) => {
  if(request.url.query.id) {
    storage.fetchItem(request.url.query.id)
      .then((result) => {
        sendJSON(response, 200, result);
      })
      .catch(error => {
        sendStatus(response, 404, error);
      });

  } else {
    storage.fetchAll()
      .then((result) => {
        sendJSON(response, 200, result);
      })
      .catch(error => {
        sendStatus(response, 500, error);
      });
  }
});

//-------- DELETE REQUEST with storage -------------

router.delete('/api/heroes', (request, response) => {
  if(!request.url.query.id) {
    sendStatus(response, 400, '__DELETE_ERROR__ no ID in query');
    return;
  }

  storage.deleteItem(request.url.query.id)
    .then((result) => {
      sendJSON(response, 204, result);
    });
});
