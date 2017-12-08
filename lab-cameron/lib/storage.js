'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if (!result) {
      logger.log('verbose', 'STORAGE - creating an empty file');
      fsExtra.writeJSON(process.env.STORAGE_PATH);
    }
  });

storage.fetchAll = () => {
  logger.log('verbose', 'STORAGE - fetching all files');
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = user => {
  logger.log('verbose', 'STORAGE - adding the following note');
  logger.log('verbose', user);

  if (!user.id) {
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));
  }

  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, [...database, user]);
    });
};

storage.fetchItem = id => {
  logger.log('verbose', `STORAGE - fetching an item with an id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(note =>  note.id === id);
    })
    .then(note => {
      if (note === undefined) {
        throw new Error('__STORAGE_ERROR__ item not found');
      }

      return note;
    });
};

storage.deleteItem = id => {
  logger.log('verbose', `STORAGE - deleting an item with id ${id}`);

  return storage.fetchAll()
    .then(database => {
      return database.filter(item => item.id !== id);
    })
    .then(filteredItems => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, filteredItems);
    });
};
