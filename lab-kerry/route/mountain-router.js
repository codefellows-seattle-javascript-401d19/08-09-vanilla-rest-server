'use strict';

const Mountain = require('../model/mountain');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage')


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
  storage.addItem(mountain)
    .then( () => {
      sendJSON(response, 200, mountain);
    })
    .catch(error => {
      sendStatus(response, 500, error)
    });
});


router.get('/api/mountains', (request, response) => {
  if(request.url.query.id) {
    storage.fetchItem(request.url.query.id)
      .then(mountain => {
        sendJSON(response, 200, mountain);
      })
      .catch(error => {
        console.log(request.url.query.id)
        sendStatus(response, 404, 'id not found')
    })
  }
});

router.delete('/api/mountains', (request, response) => {
  storage.deleteItem(request.url.query.id)
  .then(mountains => {
      sendJSON(response, 204, mountains);
      logger.log('info', `User deleted ${request.url.query.id} from database.`);
    })
    .catch(error => {
      console.log(request.url.query.id)
      sendStatus(response, 400, 'id not found');
      logger.log('info', `Deletion requested from database, but ${request.url.query.id} not found.`);
    })
  });