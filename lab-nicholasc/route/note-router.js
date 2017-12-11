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
  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.body.title){
    sendStatus(response, 400, 'title not found');
    return;
  }
  if(!request.body.content){
    sendStatus(response, 400, 'content not found');
    return;
  }

  let note = new Note(request.body.title, request.body.content);
  notes.push(note);
  sendJSON(response, 200, notes);
});

router.get('/api/notes', (request, response) => {
  if(request.url.query.id){
    let note=[];
    for(let index of notes){
      if(index.id === request.url.query.id){
        note.push(index);
        sendJSON(response, 200, note);
        return;
      }
    }
  }
  sendJSON(response, 200, notes);
});
router.delete('/api/notes', (request, response) => {
  if(request.url.query.id){
    for(let i = 0; i< notes.length; i++){
      if(notes[i].id === request.url.query.id){
        notes.splice(i, 1);
        response.writeHead(204, {'Content-Type' : 'text/plain'});
        response.write('deleted');
        response.end();
        return;
      }
    }
  }
  response.writeHead(404, {'Content-Type' : 'text/plain'});
  response.write('not found');
  response.end();
  return;
});
