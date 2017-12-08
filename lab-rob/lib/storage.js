'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');
let STORAGE_PATH = process.env.STORAGE_PATH;

const storage = module.exports = {};

if(!STORAGE_PATH) {
  STORAGE_PATH = `${__dirname}/../db.json`;
}

fsExtra.pathExists(STORAGE_PATH)
  .then(result => {
    if(!result) {
      logger.log('verbose', `STORAGE_PATH doesn't exist, creating file ${STORAGE_PATH}`);
      fsExtra.writeJSON(STORAGE_PATH, []);
    }
  });

storage.fetchAllTrialsBikes = () => {
  logger.log('verbose', 'STORAGE - Fetching array from database');
  return fsExtra.readJSON(STORAGE_PATH);
};

storage.addTrialsBike = trialsBike => {
  logger.log('verbose', 'STORAGE - adding the following bike:');
  logger.log('verbose', trialsBike);

  if(!trialsBike.id)
    return Promise.reject(new Error('__STORAGE_ERROR__: Item must have an id.'));
  
  return storage.fetchAllTrialsBikes()
    .then(database => {
      return fsExtra.writeJSON(STORAGE_PATH, [...database, trialsBike]);
    });
};

storage.fetchTrialsBike = id => {
  logger.log('verbose', `STORAGE - fetching trials bike with id ${id}.`);
  return storage.fetchAllTrialsBikes()
    .then(database => {
      let trialsBike = database.find(trialsBike => trialsBike.id === id);
      if(trialsBike === undefined)
        throw new Error('__STORAGE_ERROR__: item not found.');
      return trialsBike;
    });
};

storage.deleteTrialsBike = id => {
  logger.log('verbose', `STORAGE - removing trials bike with id ${id}`);
  return storage.fetchAllTrialsBikes()
    .then(database => {
      let filteredDb = database.filter(trialsBike => trialsBike.id !== id);

      if(filteredDb.length === database.length)
        throw new Error('__STORAGE_ERROR__: item not found')
  
      return fsExtra.writeJSON(STORAGE_PATH, filteredDb);
    });
};