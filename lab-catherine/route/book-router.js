'use strict';

const Book = require('../model/book');
const router = require('../lib/router');
const logger = require('../lib/logger');

let books = [];
let useId;

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
  books.push(book);
  sendJSON(response, 200, book);
});

router.get('/api/books', (request, response) => {
  if(request.url.query.id) {
    let designatedBook;
    books.forEach((book) => {
      if(request.url.query.id === book['id']) {
        designatedBook = book;
        return;
      }
    });
    if(!designatedBook) {
      sendStatus(response, 404, 'ID Not Found');
      return;
    }
    sendJSON(response, 200, designatedBook);
  } else {
    sendJSON(response, 200, books);
  }
});