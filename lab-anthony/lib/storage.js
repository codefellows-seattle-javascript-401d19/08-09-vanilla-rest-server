'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result){
      logger.log('verbose', 'STORAGE - creating storage');
      fsExtra.writeJSON(process.env.STORAGE_PATH, []);
    }
  });

storage.fetchAll = () => {
  logger.log('verbose', 'STORAGE - fetching all the files');
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = (beer) => {
  logger.log('verbose', 'STORAGE - adding beer');
  logger.log('verbose', beer);

  if(!beer.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ beer must have an id'));

  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, [...database, beer]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose', `STORAGE - fetching a beer with id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(beer => beer.id === id);
    })
    .then(beer => {
      if(beer === undefined)
        throw new Error('__STORAGE_ERROR_ beer not found');
      return beer;
    });
};


storage.deleteItem = (id) => {
  logger.log('verbose',`STORAGE - deleting a beer with id ${id}`);

  return storage.fetchAll()
    .then(database => {
      return database.filter(beer => beer.id !== id);
    })
    .then(filteredItems => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, filteredItems);
    });
};
