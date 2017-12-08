'use strict';

const Team = require('../model/team');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

let sendStatus = (response, status, message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response, status, jsonData) => {
  logger.log('info',`Responding with a ${status} code and the following data`);
  logger.log('info', jsonData);
  response.writeHead(status,{
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};


router.post('/api/teams', (request, response) => {
  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.body.sport){
    sendStatus(response, 400, 'sport not found');
    return;
  }
  if(!request.body.city){
    sendStatus(response, 400, 'city not found');
    return;
  }
  if(!request.body.nickname){
    sendStatus(response, 400, 'nickname not found');
    return;
  }

  let team = new Team(request.body.sport, request.body.city, request.body.nickname);
  storage.addItem(team)
    .then( () => {
      sendJSON(response, 200, team);
    })
    .catch(error => {
      sendStatus(response, 500, error);
    });
});

router.get('/api/teams', (request, response) => {
  if(request.url.query.id) {
    storage.fetchItem(request.url.query.id)
      .then(team => sendJSON(response, 200, team))
      .catch(error => {
        sendStatus(response, 404, error);
      });
  } else {
    storage.fetchAll()
      .then(teams => sendJSON(response, 200, teams))
      .catch(error => {
        sendStatus(response, 500, error);
      });
  }
});

router.delete('/api/teams', (request, response) => {
  if(request.url.query.id){
    storage.deleteItem(request.url.query.id)
      .then(sendStatus(response, 204))
      .catch(error => {
        sendStatus(response, 404, error);
      }); //TODO;
  } else {
    sendStatus(response, 400);
  }
});
