'use strict';

const Note = require('../model/note');
const router = require('../lib/router');
const logger = require('../lib/logger');

let notes = [];

let sendStatus = (response, status, message)=>{
  logger.log('info', `responding with a status code of ${status} due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response, status, jsonData) => {
  logger.log('info', `responding with a status code of ${status} and the following data`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type' : 'applicaton/json',
  });
  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post('/api/notes', (request, response) => {
  //here, i know that request has been pre-parsed- request parser in router took care of it
  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.title){
    sendStatus(response, 400, 'title not found');
    return;
  }
  if(!request.content){
    sendStatus(response, 400, 'content not found');
    return;
  }

  let note = new Note(request.body.title, request.body.content);
  notes.push(note);
  sendJSON(response, 200, notes);
});
