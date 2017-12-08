'use strict';

const logger = require('./logger');
const fsx = require('fs-extra');

const storage = module.exports = {};

fsx.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result){
      logger.log('verbose', 'STORAGE - creating an empty file');
      fsx.writeJSON(process.env.STORAGE_PATH, []);
    }
  });

storage.fetchAll = () => {
  logger.log('verbose', 'STORAGE - fetching all files');
  return fsx.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = (cat) => {
  logger.log('verbose', 'STORAGE - adding the following cat');
  logger.log('verbose', cat);

  if(!cat.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));

  return storage.fetchAll()
    .then(database => {
      console.log(database);
      return fsx.writeJSON(process.env.STORAGE_PATH,[...database, cat]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose', `STORAGE - fetching an item with id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(cat => cat.id === id);
    })
    .then(cat => {
      if(cat === undefined)
        throw new Error('__STORAGE_ERROR_ item not found');

      return cat;
    });
};


storage.deleteItem = (id) => {
  logger.log('verbose', `STORAGE - deleting an item with id ${id}`);

  return storage.fetchAll()
    .then(database => {
      return database.filter(item => item.id !== id);
    })
    .then(filteredItems => {
      return fsx.writeJSON(process.env.STORAGE_PATH, filteredItems);
    });
};
