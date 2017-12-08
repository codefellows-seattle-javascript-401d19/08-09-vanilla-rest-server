'use strict';

const Beer = require('../model/beer.js');
const router = require('../lib/router.js');
const logger = require('../lib/logger.js');
const storage = require('../lib/storage');

let beers = [];

let sendStatus = (response, status, message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);
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

router.post('/api/beers', (request, response) => {
  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.body.brewery){
    sendStatus(response, 400, 'brewery not found');
    return;
  }
  if(!request.body.beerName){
    sendStatus(response, 400, 'beer name not found');
    return;
  }
  if(!request.body.beerType){
    sendStatus(response, 400, 'beer type not found');
    return;
  }
  let beer = new Beer(request.body.brewery, request.body.beerName, request.body.beerType);
  storage.addItem(beer)
    .then(() => {
      sendJSON(response, 200, beer);
    })
    .catch(error => {
      sendStatus(response, 500, error);
    });
});

router.get('/api/beers', (request, response) => {
  if(request.url.query.id){
    storage.fetchItem(request.url.query.id)
      .then(beer => sendJSON(response, 200, beer))
      .catch(err => {
        if(err.message.indexOf('not found') > -1)
          return sendStatus(response, 404);
        sendStatus(500);
      });
  } else {
    storage.fetchAll()
      .then(beers => sendJSON(response, 200, beers))
      .catch(err => {
        console.error(err);
        sendStatus(response, 500);
      });
  }
});
//
router.delete('/api/beers', (request, response) => {
  if(!request.url.query.id){
    return sendStatus(response, 400);
  } else {
    storage.fetchItem(request.url.query.id)
      .then(beer => {
        return storage.deleteItem(beer.id);
      })
      .then(() => {
        sendStatus(response, 204);
      })
      .catch(err => {
        if(err.message.indexOf('not found') > -1)
          return sendStatus(response, 404);
        sendStatus(response, 500);
      });
  }
});
