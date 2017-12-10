'use strict';

const Mountain = require('../model/mountain');
const router = require('../lib/router');
const logger = require('../lib/logger');

const storage = require('../lib/storage');

let sendStatus = (response,status,message) => {
  logger.log('info', `Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response,status,jsonData) => {
  logger.log('info', `responding with a ${status} code and the following json data`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

let getMountainById = id => {
  return storage.fetchItem(id);
};

let deleteMountainById = id => {
  let indexOfId = storage
    .map(mountain => mountain.id)
    .indexOf(id);

  if(indexOfId < 0)
    return false;
  else {
    indexOfId = storage.slice(0, indexOfId).concat(storage.splice(indexOfId + 1));
    return true;
  }
};

router.post('/api/mountains', (request, response) =>  {
  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response,400,'name not found');
    return;
  }
  if(!request.body.state){
    sendStatus(response,400,'state not found');
    return;
  }
  if(!request.body.hiking){
    sendStatus(response,400,'hiking info not found');
    return;
  }
  if(!request.body.range){
    sendStatus(response,400,'range name not found');
    return;
  }
  let mountain = new Mountain(
    request.body.name,
    request.body.state,
    request.body.hiking,
    request.body.range
  );

  storage.addItem(mountain)
    .then(() => {
      sendJSON(response,200,mountain);
    })
    .catch(error => {
      sendStatus(response,500,error);
    });

});

router.get('/api/mountains', (request, response) =>  {
  let id = request.url.query.id;

  if(!id) {
    storage.fetchAll()
      .then((mountains) => {
        sendJSON(response, 200, mountains);
      })
      .catch(error => {
        sendStatus(response, 500, error);
      });
  } else {
    storage.fetchItem(id)
      .then((mountain) => {
        sendJSON(response, 200, mountain);
      })
      .catch(error => {
        sendStatus(response, 404, error);
      });
  }
});

router.delete('/api/mountains', (request, response) => {
  let id = request.url.query.id;
  storage.deleteItem(id)
    .then((filteredMountains) => {
      sendJSON(response, 200, filteredMountains);
    })
    .catch(error => {
      sendStatus(response, 404, error);
    });
});
