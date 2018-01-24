'use strict';

const Beer = require('../model/beer.js');
const router = require('../lib/router.js');
const logger = require('../lib/logger.js');

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
  beers.push(beer);
  sendJSON(response, 200, beer);
});

router.get('/api/beers', (request, response) => {
  if(request.url.query.id){
    let findBeerById = beers.find(beer => beer.id === request.url.query.id);
    if (findBeerById) {
      sendJSON(response, 200, findBeerById);
      return;
    } else {
      sendStatus(response, 404, 'beer not found');
      return;
    }
  } else {
    sendJSON(response, 200, beers);
    return;
  }
});

router.delete('/api/beers', (request, response) => {
  if(request.url.query.id){
    let filterBeerById = beers.filter(beer => beer.id !== request.url.query.id);
    if (filterBeerById) {
      beers = filterBeerById;
      sendJSON(response, 200, beers);
      return;
    } else {
      sendStatus(response, 400, 'beer not found');
      return;
    }
  } else {
    sendJSON(response, 200, beers);
    return;
  }
});
