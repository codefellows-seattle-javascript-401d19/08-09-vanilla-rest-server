'use strict';

const fsExtra = require('fs-extra');
const logger = require('./logger');

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result){
      logger.log('verbose', 'STORAGE - creating and empty file');
      fsExtra.writeJSON(process.env.STORAGE_PATH, []);
    }
  });
//-----------------------------
require('dotenv').config();
const STORAGE_PATH = process.env.STORAGE_PATH;
//----------------------------------


storage.fetchAll = () => {
  logger.log('verbose', 'STORAGE - fetching all files');
  return fsExtra.readJSON(STORAGE_PATH);
};

storage.addItem = (note) => {
  logger.log('verbose', 'STORAGE - adding this note');
  logger.log('verbose', note);

  if(!note.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));

  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(STORAGE_PATH, [...database, note]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose', `STORAGE - fetching an item with id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(note => note.id === id);
    })
    .then(note => {
      if(note === undefined)
        throw new Error('__STORAGE_ERROR__ item not found');

      return note;
    });
};

storage.deleteItem = (id) => {
  logger.log('verbose', `STORAGE - deleting an item with id ${id}`);

  return storage.fetchAll()
    .then(database => {
      return database.filter(note => note.id !== id);
    })
    .then(filteredNotes => {
      return fsExtra.writeJSON(STORAGE_PATH, filteredNotes);
    });
};
