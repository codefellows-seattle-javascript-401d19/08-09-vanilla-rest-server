'use strict';

const TrialsBike = require('../model/trials-bike');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

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

router.post('/api/trials-bikes', (req, res) => {
  if(!(typeof req.body.make === 'string')) {
    sendBadStatus(res, 400, `bad request, request property "make" must be of type string. You supplied type: ${typeof req.body.make}`);
    return;
  }
  
  if (!(typeof req.body.model === 'string')) {
    sendBadStatus(res, 400, `bad request, request property "model" must be of type string. You supplied type: ${typeof req.body.model}`);
    return;
  }

  if (!(typeof req.body.year === 'number')) {
    sendBadStatus(res, 400, `bad request, request property "year" must be of type number. You supplied type: ${typeof req.body.year}`);
    return;
  }

  if (!(typeof req.body.displacement === 'number')) {
    sendBadStatus(res, 400, `bad request, request property "displacement" must be of type number. You supplied type: ${typeof req.body.displacement}`);
    return;
  }

  if (!(typeof req.body.color === 'string')) {
    sendBadStatus(res, 400, `bad request, request property "color" must be of type string. You supplied type: ${typeof req.body.color}`);
    return;
  }

  let trialsBike = new TrialsBike(
    req.body.make,
    req.body.model,
    req.body.year,
    req.body.displacement,
    req.body.color
  );
  
  storage.addTrialsBike(trialsBike)
    .then(() => {
      sendJSON(res, 200, trialsBike);
    })
    .catch(() => {
      sendBadStatus(res, 500, 'SERVER_ERROR');
    });
});

router.get('/api/trials-bikes', (req, res) => {
  let id = req.url.query.id;
  if(id) {
    storage.fetchTrialsBike(id)
      .then(trialsBike => {
        sendJSON(res, 200, trialsBike); 
      })
      .catch(() => {
        sendBadStatus(res, 404, `No bike with id "${id}".`); 
      });
  } else {
    storage.fetchAllTrialsBikes()
      .then(trialsBikes => {
        sendJSON(res, 200, trialsBikes);
      });
  }
});

router.delete('/api/trials-bikes', (req, res) => {
  let id = req.url.query.id;
  if(id) {
    storage.deleteTrialsBike(id)
      .then(() => {
        logger.log('info', `Bike deleted, responding with a 204 code.`);
        res.writeHead(204);
        res.end();
      })
      .catch(() => {
        sendBadStatus(res, 404, `No bike with id "${id}".`);
      });
  } else
    sendBadStatus(res, 400, `bad request, no id.`);
});

