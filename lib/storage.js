'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result) {
      logger.log('verbose', 'STORAGE - creating an empty file');
      fsExtra.writeJSON(process.env.STORAGE_PATH, []);
    }
  });

storage.fetchAll = () => {
  logger.log('verbose', 'STORAGE - fetching all files');
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = (wizard) => {
  logger.log('verbose', 'STORAGE - adding the following wizard');
  logger.log('verbose', wizard);

  if(!wizard.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));
  
  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, [...database, wizard]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose', `STORAGE - fetching an item with id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(wizard => wizard.id === id);
    })
    .then(wizard => {
      if(wizard === undefined)
        throw new Error('__STORAGE_ERROR_ item not found');

      return wizard;
    });
};

storage.deleteItem = (id) => {
  logger.log('verbose', `STORAGE - deleting an item with id ${id}`);

  return storage.fetchAll()
    .then(database => {
      return database.filter(item => item.id !== id);
    })
    .then(filteredItems => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, filteredItems);
    });
};