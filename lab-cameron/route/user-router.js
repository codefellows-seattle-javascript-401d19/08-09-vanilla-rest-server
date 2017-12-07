'use strict';

const User = require('../model/user');
const router = require('../lib/router');
const logger = require('../lib/logger');

const users = [];
// data for testing
users.push(new User('test_name_1', 'test_description_1'));
users.push(new User('test_name_2', 'test_description_2'));

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

const findUserWithId = querystring => {
  for (let i = 0; i < users.length; i++) {
    if (users[i].getId() === querystring) {
      return users[i];
    } else {
      return false;
    }
  }
};

router.get('/api/users', (request, response) => {
  if (request.url.query.id) {
    const foundUserWithId = findUserWithId(request.url.query.id);
    sendJSON(response, 200, foundUserWithId);
    return;
  }
  request.body = users;
  sendJSON(response, 200, users);
});

router.post('/api/users', (request, response) => {
  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response,400,'title not found');
    return;
  }
  if(!request.body.description){
    sendStatus(response,400,'content not found');
    return;
  }

  let user = new User(request.body.name, request.body.description);
  users.push(user);
  console.log(users);
  sendJSON(response, 200, user);
});
