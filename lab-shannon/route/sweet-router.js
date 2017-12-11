'use strict';

const Sweet = require(`../model/sweet`);
const router = require(`../lib/router`);
const logger = require(`../lib/logger`);
const storage = require(`../lib/storage`);

let sweets = [];

let sendStatus = (response, status, message) => {
  logger.log(`info`, `ERROR: ${message}`);
  logger.log(`info`, `Sending status: ${status}`);

  response.writeHead(status);
  response.end();
  return;
};

let sendJSON = (response, status, sweetsFile) => {
  logger.log(`info`, `Sending JSON!`);

  response.writeHead(status, {
    'Content-Type' : 'application/json',
  });
  response.write(sweetsFile);
  response.end();
  return;
};

router.post(`/api/sweets`, (request, response) => {
  if(!request.body.name){
    return sendStatus(response, 404, 'A sweet has no name');
  }

  if(!request.body.hasChocolate){
    return sendStatus(response, 404, 'Does the sweet have chocolate? Yes or no, man!');
  }

  if(!request.body.temperature){
    return sendStatus(response, 404, 'Could not find the temperature of the sweet :(');
  }

  let sweet = new Sweet(request.body.name, request.body.hasChocolate, request.body.temperature);
  sweets.push(sweet);
  sendJSON(response, 200, sweet);
  logger.log(`info`, `The new sweet's id is :${sweet.id}`);
});


router.get(`/api/sweets`, (request, response) => {
  let id = request.url.query.id;

  let matchingSweet = sweets.filter(sweet => sweet.id === id);
  logger.log(`info`, `${matchingSweet} is the matching sweet`);

  if(request.url.query.id){
    if(matchingSweet.length < 1){
      return sendStatus(response, 404, `There is no sweet with that id`);
    }
    return sendJSON(response, 200, matchingSweet[0]);
  }

  sendJSON(response, 200, storage.showAllSweets());
});

router.delete(`/api/sweets`, (request, response) => {
  let id = request.url.query.id;
  let matchingSweet = sweets.filter(sweet => sweet.id === id);

  if(id.length < 1)
    return sendStatus(response, 400, `You must specify which sweet to delete by providing an id`);

  if(matchingSweet.length < 1)
    return sendStatus(response, 404, `A sweet with that id does not exist`);

  matchingSweet = {};
  let deletedSweet = matchingSweet;
  sendJSON(response, 204, deletedSweet);
});
