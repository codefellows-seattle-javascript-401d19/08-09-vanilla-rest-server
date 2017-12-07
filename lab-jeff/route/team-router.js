'use strict';

const Team = require('../model/team');
const router = require('../lib/router');
const logger = require('../lib/logger');

let teams = [];

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
  teams.push(team);
  sendJSON(response, 200, team);
});

router.get('/api/teams', (request, response) => {
  if(request.url.query.id) {
    let teamById = teams.find(team => team.id === request.url.query.id);
    if(teamById === undefined) {
      sendStatus(response, 404, 'id not found');
    } else {
      sendJSON(response, 200, teamById);
    }
  } else {
    sendJSON(response, 200, teams);
  }
});

router.delete('/api/teams', (request, response) => {
  if(request.url.query.id){
    let teamIndex= teams.findIndex(team => team.id === request.url.query.id);
    if(teamIndex < 0) {
      sendStatus(response, 404);
    } else {
      teams.splice(teamIndex, 1);
      sendStatus(response, 204);
    }
  } else {
    sendStatus(response, 400);
  }
});
