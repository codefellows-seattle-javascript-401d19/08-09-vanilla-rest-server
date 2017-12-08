'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result){
      logger.log('verbose','STORAGE - creating an empty file');
      fsExtra.writeJSON(process.env.STORAGE_PATH,[]);
    }
  });

storage.fetchAll = () => {
  logger.log('verbose', 'STORAGE - fetching all files');
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = (hero) => {
  logger.log('verbose', 'STORAGE - adding the following hero');
  logger.log('verbose', hero);

  if(!hero.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));

  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, [...database, hero]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose', `STORAGE - fetching hero with id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(hero => hero.id === id);
    })
    .then(hero => {
      if(hero === undefined)
        throw new Error('__STORAGE_ERROR__ item not found');

      return hero;
    });
};

storage.deleteItem = (id) => {
  logger.log('verbose', `STORAGE - deleting an hero with id ${id}`);

  return storage.fetchAll()
    .then(database => {
      return database.filter(hero => hero.id !== id);
    })
    .then(filteredHeroes => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, filteredHeroes);
    });
};
