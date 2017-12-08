'use strict';

const Note = require('../model/note');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

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
      return;
    })
    .catch(error =>{
      sendStatus(response, 500, error);
      return;
    });
});

router.get('/api/notes', (request, response) => {
  if(request.url.query.id){
    storage.fetchItem(request.url.query.id)
      .then(note => {
        sendJSON(response, 200, note);
        return;
      })
      .catch(error =>{
        sendStatus(response, 500, error);
        return;
      });
  }else{
    storage.fetchAll()
      .then(notes => {
        sendJSON(response, 200, notes);
        return;
      })
      .catch(error =>{
        sendStatus(response, 500, error);
        return;
      });
  }
});

router.delete('/api/notes', (request, response) => {
  if(request.url.query.id){
    storage.deleteItem(request.url.query.id)
      .then(() => {
        sendStatus(response, 204, 'successfully deleted');
        return;
      })
      .catch(error =>{
        sendStatus(response, 500, error);
        return;
      });
  }else{
    sendStatus(response, 404, 'id not found');
    return;
  }
});
