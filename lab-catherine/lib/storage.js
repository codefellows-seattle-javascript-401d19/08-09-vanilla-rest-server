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

storage.addItem = (book) => {
  logger.log('verbose', 'STORAGE - adding the following book');
  logger.log('verbose', book);

  if(!book.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));
  
  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, [...database, book]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose', `STORAGE - fetching an item with id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(book => book.id === id);
    })
    .then(book => {
      if(book === undefined)
        throw new Error('__STORAGE_ERROR_ item not found');

      return book;
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