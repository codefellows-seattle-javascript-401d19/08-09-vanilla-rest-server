'use strict';

const Hero = require('../model/hero.js');
const router = require('../lib/router');
const logger = require('../lib/logger');
const storage = require('../lib/storage');

let sendStatus = (response, status, message) => {
  logger.log('info', `Responding with a ${status} code due to the ${message}`);

  response.writeHead(status);
  response.end();
  return;
};

let sendJSON = (response, status, jsonData) => {
  logger.log('info', `Responding with a ${status} code and following data`);
  logger.log('info', jsonData);
  response.writeHead(status, {
    'Content-Type': 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

  //-------- POST REQUEST ----------------

router.post('/api/heroes', (request, response) => {
  if(!request.body){
    sendStatus(response, 400, 'body of hero not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response, 400, 'hero\'s name not found');
    return;
  }
  if(!request.body.superPower){
    sendStatus(response, 400, 'hero\'s superPower not found');
    return;
  }

  let hero = new Hero(request.body.name, request.body.superPower);
  storage.addItem(hero)
    .then(() => {
      sendJSON(response, 200, hero);
    })
    .catch(error => {
      sendStatus(response, 500, error);
    });
});

//-------- GET REQUEST ----------------

// ========= OLD WAY =============

router.get('/api/heroes', (request, response) => {
  if(request.url.query.id) {
    let heroName;
    heroes.forEach((hero) => {
      if(request.url.query.id === hero['id']) {
        heroName = hero;
        return;
      }
    });

    if(!heroName) {
      sendStatus(response, 404, '__HERO_ID_NOT_FOUND__');
      return;
    }
    sendJSON(response, 200, heroName);
  } else {
    sendJSON(response, 200, heroes);
  }
});

// ========= NEW WAY ============

router.get('/api/heroes', (request, response) => {

  // return storage.fetchI


  if(request.url.query.id) {
    let heroName;
    heroes.forEach((hero) => {
      if(request.url.query.id === hero['id']) {
        heroName = hero;
        return;
      }
    });

    if(!heroName) {
      sendStatus(response, 404, '__HERO_ID_NOT_FOUND__');
      return;
    }
    sendJSON(response, 200, heroName);
  } else {
    storage.fetchAll()
      .then((result) => {
        sendJSON(response, 200, result);
      })
      .catch(error => {
        sendStatus(response, 404, error);
      });
  }
});

// -------- DELETE REQUEST ----------------

router.delete('/api/heroes', (request, response) => {
  if(!request.url.query.id) {
    sendStatus(response, 400, 'lack of ID in query');
    return;
  }
  let heroName;
  heroes.forEach((hero) => {
    if(request.url.query.id === hero['id']) {
      heroName = hero;
      return;
    }
  });
  let heroIndex = heroes.indexOf(heroName);
  if(!heroName) {
    sendStatus(response, 404, 'This hero doesn\'t exist, hero ID not found');
    return;
  } else {
    console.log(`inside DELETE with ${heroName}`);
    heroes.splice(heroIndex, 1);
    console.log(`This is my new array of heroes: ${heroes}`);
    sendStatus(response, 204, 'SUCCESSFULLY__DELETING__A__HERO');
  }
});
