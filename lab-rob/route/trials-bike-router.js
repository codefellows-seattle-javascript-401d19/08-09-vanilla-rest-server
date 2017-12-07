'use strict';

const TrialsBike = require('../model/trials-bike');
const router = require('../lib/router');
const logger = require('../lib/logger');

let trialsBikes = [];

let sendStatus = (res, status, message) => {
  logger.log('info', `Responding with a ${status} code due to ${message}.`);
  res.writeHead(status);
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

router.post('/api/trialsBikes', (req, res) => {
  if(!req.body) {
    sendStatus(res, 400, 'body not found!');
    return;
  }

  if(!req.body.make) {
    sendStatus(res, 400, 'make not found!');
    return;
  }
  
  if(!req.body.model) {
    sendStatus(res, 400, 'model not found!');
    return;
  }

  if(!req.body.year) {
    sendStatus(res, 400, 'year not found!');
    return;
  }

  if(!req.body.displacement) {
    sendStatus(res, 400, 'displacement not found!');
    return;
  }

  if(!req.body.color) {
    sendStatus(res, 400, 'color not found!');
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

