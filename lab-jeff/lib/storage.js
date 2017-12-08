'use strict';

const logger = require('./logger');
const fsExtra = require('fs-extra');

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result){
      logger.log('verbose', 'STORAGE - creating an empty file');
      fsExtra.writeJSON(process.env.STORAGE_PATH,[]);
    }
  });

storage.fetchAll = () => {
  logger.log('verbose', 'STORAGE - fetching all files');
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.addItem = (team) => {
  logger.log('verbose', 'STORAGE - adding the following team');
  logger.log('verbose', team);

  if(!team.id)
    return Promise.reject(new Error('__STORAGE_ERROR__ team must have an id'));
  // jeff - add more tests?

  return storage.fetchAll()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH,[...database,team]);
    });
};

storage.fetchItem = (id) => {
  logger.log('verbose', `STORAGE - fetching a team with id ${id}`);
  return storage.fetchAll()
    .then(database => {
      return database.find(team => team.id === id);
    })
    .then(team => {
      if(team === undefined)
        throw new Error('__STORAGE_ERROR_ team not found');

      return team;
    });
};


storage.deleteItem = (id) => {
  logger.log('verbose',`STORAGE - deleting an item with id ${id}`);

  return storage.fetchAll()
    .then(database => {
      return database.filter(team => team.id !== id);
    })
    .then(filteredItems => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH,filteredItems);
    });
};
