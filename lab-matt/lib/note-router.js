'use strict';

const note = require('../model/note');
const router = require('../route/router');
const logger = require('./logger');


//              <url>       <callback>
router.post('/api/notes', (request, response) => {
  if (!request.body) {
    sendStatus(response, 400, 'body not found');
    return;
  }

  if (!request.body.title) {
    sendStatus(response, 400, 'title not found');
    return;
  }

  if (!request.body.content) {
    sendStatus(response, 400, 'content not found');
    return;
  }

  let note = new Note(request.body.title, request.body.content);
  notes.push(note);

  sendJSON(response, 200, note);
});



// helper function -------
let sendStatus = (response, status, message) => {
  logger.info(`Responding wih a ${status} code due to ${message}`);
  response.writeHead(status);
  response.end();
};

let sendJSON = (response, status, jsonData) => {
  logger.info(`Responding with a ${status} code and the following data \nData: ${jsonData}`);
  response.writeHead(status, {'Content-Type': 'application/json'});
  response.write(JSON.stringify(jsonData));
  response.end();
};