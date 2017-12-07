'use strict';

const TrialsBike = require('../model/trials-bike');
const router = require('../lib/router');
const logger = require('../lib/logger');

let trialsBikes = [];

let sendBadStatus = (res, status, message) => {
  logger.log('info', `Responding with a ${status} code due to ${message}.`);
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify({error: message}));
  res.end();
};

let sendJSON = (res, status, jsonData) => {
  logger.log('info', `Responding with a ${status} code and the following data:`);
  logger.log('info', jsonData);
  res.writeHead(status, {
    'Content-Type': 'application/json',
  });
  res.write(JSON.stringify(jsonData));
  res.end();
  return;
};

let getBikeById = id => {
  return trialsBikes.filter(trialsBike => trialsBike.id === id)[0];
};

router.post('/api/trials-bikes', (req, res) => {
  if(!req.body.make) {
    sendBadStatus(res, 400, 'bad request, make not found!');
    return;
  }
  
  if(!req.body.model) {
    sendBadStatus(res, 400, 'bad request, model not found!');
    return;
  }

  if(!req.body.year) {
    sendBadStatus(res, 400, 'bad request, year not found!');
    return;
  }

  if(!req.body.displacement) {
    sendBadStatus(res, 400, 'bad request, displacement not found!');
    return;
  }

  if(!req.body.color) {
    sendBadStatus(res, 400, 'bad request, color not found!');
    return;
  }

  let trialsBike = new TrialsBike(
    req.body.make,
    req.body.model,
    req.body.year,
    req.body.displacement,
    req.body.color
  );
  
  trialsBikes.push(trialsBike);
  sendJSON(res, 200, trialsBike);
});

router.get('/api/trials-bikes', (req, res) => {
  let id = req.url.query.id;
  if(id) {
    let requestedBike = getBikeById(id);
    if(requestedBike)
      sendJSON(res, 200, requestedBike);
    else
      sendBadStatus(res, 404, `No bike with id "${id}".`);
  } else
    sendJSON(res, 200, trialsBikes);
});

