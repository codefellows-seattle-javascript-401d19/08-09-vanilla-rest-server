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

const findUserWithId = (querystring, users) => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].testId === querystring) {
      return users[i];
    }
  }
  return null;
};

router.get('/api/users', (request, response) => {
  const userId = request.url.query.id;
  
  storage.fetchAll()
    .then(allUsers => {
      if (userId) {
        const foundUserWithId = findUserWithId(userId, allUsers);

        foundUserWithId ?
          sendJSON(response, 200, foundUserWithId) :
          sendStatus(response, 404, 'id not found');

        return;
      }
      sendJSON(response, 200, allUsers);
      return;
    })
    .catch(error => {
      sendStatus(response, 500, error);
      return;
    });


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
  if (request.url.query.id) {
    const userToBeRemoved = findUserWithId(request.url.query.id);
    if (userToBeRemoved) {
      const updatedUsers = users.filter(user => {
        console.log(userToBeRemoved.testId, user.testId);
        return userToBeRemoved.testId === user.testId;
      });
      users = updatedUsers;
      sendJSON(response, 204, users);
      return;
    } else {
      sendStatus(response, 404, 'id does not exit');
    }
  } else {
    sendStatus(response, 400, 'no id provided');
    return;
  }
});
