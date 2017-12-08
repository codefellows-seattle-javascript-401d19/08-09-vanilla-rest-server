'use strict';

const Book = require('../model/book');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

let sendStatus = (response, status, message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);
  response.writeHead(status);
  response.end();
};

let sendJSON = (response, status, JSONData) => {
  logger.log('info',`Responding with a ${status} code and the following data`);
  logger.log('info',JSONData);
  response.writeHead(status,{
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(JSONData));
  response.end();
  return;
};

router.post('/api/books', (request, response) => {
  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.body.title){
    sendStatus(response, 400, 'title not found');
    return;
  }
  if(!request.body.author){
    sendStatus(response, 400, 'author not found');
    return;
  }
  let book = new Book(request.body.title, request.body.author);
  storage.addItem(book)
    .then(() => {
      sendJSON(response, 200, book);
    })
    .catch(error => {
      sendStatus(response, 500, error);
    });
});

router.get('/api/books', (request, response) => {
  if(request.url.query.id) {
    storage.fetchItem(request.url.query.id)
      .then((result) => {
        sendJSON(response, 200, result);
      })
      .catch(error => {
        sendStatus(response, 404, error);
      });
 
  } else {
    storage.fetchAll()
      .then((result) => {
        sendJSON(response, 200, result);
      })
      .catch(error => {
        sendStatus(response, 500, error);
      });
  }
});

router.delete('/api/books', (request, response) => {
  if(!request.url.query.id) {
    sendStatus(response, 400, 'ID Not Provided');
    return;
  }
  storage.deleteItem(request.url.query.id)
    .then((result) => {
      sendJSON(response, 204, result);
    });
});