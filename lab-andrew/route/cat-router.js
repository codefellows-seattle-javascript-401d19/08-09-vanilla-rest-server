'use strict';

const Cat = require('../model/cat');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

let sendStatus = (response, status, message) => {
  logger.log('info', `Responding with a ${status} code due to ${message}`);
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

router.post('/api/cats', (request, response) => {

  if(!request.body){
    sendStatus(response, 400, 'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response, 400, 'name not found');
    return;
  }
  if(!request.body.says){
    sendStatus(response, 400, 'says not found');
    return;
  }
  let cat = new Cat(request.body.name, request.body.says);
  storage.addItem(cat)
    .then(() => {
      sendJSON(response, 200, cat);
    })
    .catch(error => {
      sendStatus(response, 500, error);
    });
});

router.get('/api/cats', (request, response) => {
  if (request.url.query.id){
    storage.fetchItem(request.url.query.id)
      .then(result => {
        sendJSON(response, 200, result);
      })
      .catch(error => {
        sendStatus(response, 404, error);
      });
  } else {
    storage.fetchAll()
      .then(result => {
        sendJSON(response, 200, result);
      })
      .catch(error => {
        sendStatus(response, 400, error);
      });
  }
});

router.delete('/api/cats', (request, response) => {
  if (!request.url.query.id){
    sendStatus(response, 400, 'no id supplied');
    return;
  }
  storage.deleteItem(request.url.query.id)
    .then(() => {
      sendStatus(response, 204, 'deletion successful');
    });

});
