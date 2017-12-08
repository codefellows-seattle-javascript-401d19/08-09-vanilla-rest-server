'use strict';

const User = require('../model/user');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

const sendStatus = (response, status, message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

const sendJSON = (response, status, jsonData) => {
  logger.log('info', `Responding with a ${status} code and the following data`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.get('/api/users', (request, response) => {
  const userId = request.url.query.id;

  if (userId) {
    storage.fetchItem(userId)
      .then(user => {
        sendJSON(response, 200, user);
        return;
      })
      .catch(error => {
        sendStatus(response, 404, error);
        return;
      });
  } else {
    storage.fetchAll()
      .then(users => {
        sendJSON(response, 200, users);
        return;
      })
      .catch(error => {
        sendStatus(response, 404, error);
        return;
      });
  }
});

router.post('/api/users', (request, response) => {
  if (!request.body) {
    sendStatus(response, 400, 'body not found');
    return;
  }
  if (!request.body.name) {
    sendStatus(response, 400, 'title not found');
    return;
  }
  if (!request.body.description) {
    sendStatus(response, 400, 'content not found');
    return;
  }

  let user = new User(request.body.name, request.body.description);
  storage.addItem(user)
    .then(() => {
      sendJSON(response, 200, user);
      return;
    })
    .catch(error => {
      sendStatus(response, 500, error);
      return;
    });
});

router.delete('/api/users', (request, response) => {
  const userId = request.url.query.id;

  if (userId) {
    storage.deleteItem(userId)
      .then(() => {
        sendStatus(response, 204, 'user removed');
      })
      .catch(() => {
        sendStatus(response, 400, 'no user found');
      });
  } else {
    sendStatus(response, 404, 'no id provided');
  }
});
