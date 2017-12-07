'use strict';

const Dog = require('../model/dogs');
const router = require('../route/router');
const log = require('./logger');

let dogs = [];


// ---------------- POST ----------------
router.post('/api/dogs', (request, response) => {
  if (!request.body) {
    sendStatus(response, 400, 'body not found');
    return;
  }

  if (!request.body.legs) {
    sendStatus(response, 400, 'legs not found');
    return;
  }

  if (!request.body.isPoodle) {
    sendStatus(response, 400, 'isPoodle not found');
    return;
  }

  let dog = new Dog(request.body.legs, request.body.isPoodle);
  dogs.push(dog);

  sendJSON(response, 200, dog);
});

// ---------------- GET ----------------
router.get('/api/dogs', (request, response) => {
  let dogId = request.url.query.id;
  if (dogId) {
    let dogSearch = dogs.filter(dog => dog.id === dogId);

    if(dogSearch.length > 0) {
      sendJSON(response, 200, dogSearch[0]);
    } else {
      sendStatus(response, 400, `No dog with matching id: ${dogId}`);
    }
  } else {
    sendJSON(response, 200, dogs);
    return;
  }
});

// ---------------- DELETE ----------------
router.delete('/api/dogs', (request, response) => {

});

// =========== HELPER FUNCTIONS ===========
let sendStatus = (response, status, message) => {
  log('info', `Responding with a ${status} code due to ${message}`);
  response.writeHead(status);
  response.end();
};

let sendJSON = (response, status, jsonData) => {
  log('info', `Responding with a ${status} code and the following data \nData: ${jsonData}`);
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(jsonData));
  response.end();
};
