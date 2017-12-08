'use strict';

const Dog = require('../model/dogs');
const router = require('../route/router');
const log = require('./logger');
const storage = require('./storage');

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

  storage.addItem(dog)
    .then(dogAdded => {
      log('verbose', `DOG ADDED: ${JSON.stringify(dogAdded)}`);
      sendJSON(response, 200, dogAdded);
    });
});

// ---------------- GET ----------------
router.get('/api/dogs', (request, response) => {
  let dogId = request.url.query.id;
  if (dogId) {

    storage.fetchOne(dogId)
      .then(dogFound => {
        if(dogFound.id) {
          sendJSON(response, 200, dogFound);
        } else {
          sendStatus(response, 404, `no dog with matching id: ${dogId}`);
        }
      });

  } else {

    storage.fetchAll()
      .then(allDogs => {
        sendJSON(response, 200, allDogs);
        return;
      });

  }
});

// ---------------- DELETE ----------------
router.delete('/api/dogs', (request, response) => {
  let dogId = request.url.query.id;
  if (dogId) {
    let dogFound = storage.deleteItem(dogId);

    if(dogFound.deleted) {
      log('info', `DOG DELETED: ${dogFound.deleted}`);
      response.writeHead(204);
      response.end();   
    } else { // mattL - here, dogFound === new Error (storage.js: line68)
      sendStatus(response, 404, dogFound);
    }
  } else {
    sendStatus(response, 400, `no id given`);
  }
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
