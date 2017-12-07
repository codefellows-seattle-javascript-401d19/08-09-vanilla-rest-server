'use strict';

const User = require('../model/user');
const router = require('../lib/router');
const logger = require('../lib/logger');

let users = [];
// mock data for testing
users.push(new User('test_name_1', 'test_description_1'));
users.push(new User('test_name_2', 'test_desrription_2'));

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

router.get('/api/users', (request, response) => {
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
