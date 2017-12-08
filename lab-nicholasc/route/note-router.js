'use strict';

const Note = require('../model/note');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('..lib/storage');

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
//TODO: run console.trace(); track what happens
  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  // checking if values are present- instead we should check if values match type
  // if typeof
  if(typeof request.body.title !== 'string'){
    sendStatus(response, 400, 'title must be a string');
    return;
  }
  if(!request.body.content){
    sendStatus(response, 400, 'content not found');
    return;
  }

  let note = new Note(request.body.title, request.body.content);
  storage.addItem(note)
    .then(() => {
      sendJSON(response, 200, note);
    })
    .catch(error =>{
      sendStatus(response, 500, error);
    });
});

router.get('/api/notes', (request, response) => {
  if(request.url.query.id){
    storage.addItem(request.url.query.id)
      .then();
    //TODO:finish this function
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
