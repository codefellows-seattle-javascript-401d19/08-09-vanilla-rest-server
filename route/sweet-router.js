'use strict';

const Sweet = require(`../model/sweet`);
const router = require(`../lib/router`);
const logger = require(`../lib/logger`);

let sweets = [];

let sendStatus = (response, status, message) => {
  logger.log(`info`, `ERROR: ${message}`);
  logger.log(`info`, `Sending status: ${status}`);

  response.writeHead(status);   //only Status Code is required for writeHead()
  response.end();
  return;
};

let sendJSON = (response, status, jsonData) => {
  logger.log(`info`, `Sending JSON!`);

  response.writeHead(status, {
    'Content-Type' : 'application/json'
  });
  response.write(JSON.stringify(jsonData));
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
  console.log(request.url.query.id, `is the id`);
  console.log(sweets, `are the sweets`);

  let matchingSweet = sweets.filter(sweet => sweet[id] === id);
  console.log(matchingSweet, `is the matching sweet`);

  if(request.url.query.id){
    //if none of the objects in sweets array has the id, return an error
    if(matchingSweet.length < 1){
      return sendStatus(response, 404, `There is no sweet with that id`);
    }
    return sendJSON(response, 200, matchingSweet[0]);  //if there is a match, give me that (it's the first element in the array of matchingSweets)
  }

  sendJSON(response, 200, sweets);
});
