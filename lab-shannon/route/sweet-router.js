'use strict';

const Sweet = require(`../model/sweet`);
const router = require(`../lib/router`);
const logger = require(`../lib/logger`);
const storage = require(`../lib/storage`);

let sendStatus = (response, status, message) => {
  logger.log(`info`, `ERROR: ${message}`);
  logger.log(`info`, `Sending status: ${status}`);

  response.writeHead(status);
  response.end();
  return;
};

let sendJSON = (response, status, jsonData) => {
  logger.log(`info`, `Sending JSON!`);

  response.writeHead(status, {
    'Content-Type' : 'application/json',
  });
  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post(`/api/sweets`, (request, response) => {
  if(!request.body.name){
    return sendStatus(response, 404, 'The sweet has no name');
  }

  if(!request.body.hasChocolate){
    return sendStatus(response, 404, 'Does the sweet have chocolate? Yes or no, man!');
  }

  if(!request.body.temperature){
    return sendStatus(response, 404, 'Could not find the temperature of the sweet :(');
  }

  let sweet = new Sweet(request.body.name, request.body.hasChocolate, request.body.temperature);

  storage.addSweet(sweet)
    .then(data => {
      console.log(`the data we go is ${data}`)
      sendJSON(response, 200, sweet)
    });
  logger.log(`info`, `The new sweet's id is :${sweet.id}`);
});


router.get(`/api/sweets`, (request, response) => {
  let id = request.url.query.id;
  if(id){
    storage.getSweet(id)
    .then(data => {
      return sendJSON(response, 200, data);
    })
    .catch(error => {
      return sendStatus(response, 404, `There is no sweet with that id`);
    })
  }else{
    storage.getAllSweets()
    .then(data => {
      sendJSON(response, 200, data);
    })
  }
});

router.delete(`/api/sweets`, (request, response) => {
  let id = request.url.query.id;

  if(id.length < 1)
    return sendStatus(response, 400, `You must specify which sweet to delete by providing an id`);

  // if(matchingSweet.length < 1)
  //   return sendStatus(response, 404, `A sweet with that id does not exist`);

  storage.removeSweet(id)
    .then(data => {
      sendJSON(response, 204, data);
    });
});
