'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result){
      logger.log('verbose', `STORAGE - creating an empty file`);
      fsExtra.writeJSON(process.env.STORAGE_PATH, []);
    }
  });

storage.fetchAll = () => {
  logger.log('verbose','STORAGE - fetching all files');
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};
storage.addItem = (mountain) => {
  logger.log('verbose','STORAGE - adding the following item');
  logger.log('verbose', mountain);
  
  if(!mountain.id)
    return Promise.reject(new Error('---->STORAGE_ERROR<---- item must have an id'));
  
  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH,[...database,mountain]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose',`STORAGE - fetching an item with id ${id}`);
  return storage.fetchAll()
    .then( database => {
      return database.find(mountain => mountain.id === id);
    })
    .then(mountain => {
      if(mountain === undefined)
        throw new Error(`---->STORAGE_ERROR<---- item not found`);
        
      return mountain;
    });
};

storage.deleteItem = (id) => {
  logger.log('verbose',`STORAGE - deleting an item with id ${id}`);
  
  return storage.fetchAll()
    .then(database => {
      return database.filter(item => item.id !== item);
    })
    .then(filteredItems => {
      fsExtra.writeJSON(process.env.STORAGE_PATH,filteredItems);
    });
};