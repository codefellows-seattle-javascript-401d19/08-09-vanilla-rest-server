'use strict';

const logger = require('./logger');
const fsExtra = require(`fs-extra`);

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)
  .then(result => {
    if(!result){
      logger.log(`info`, `Creating a new storage file`);
      fsExtra.writeJSON(process.env.STORAGE_PATH, []);
    }
  });

storage.getAllSweets = () => {

  logger.log(`info`, `All sweets are being retrieved!`);
  console.log(`allSweets ran`);
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.getSweet = (id) => {
  console.log(`getSweet ran`);
  logger.log(`info`, `Getting the sweet with id: ${id}`);

  return storage.getAllSweets()
    .then(database => {
      return database.filter(sweet => {
        sweet.id === id;
      });
    })
    .then(sweet => {
      if(sweet === undefined)
        throw new Error(`STORAGE_ERROR: nothing found with that id`);

      return sweet;
    });
};

storage.addSweet = (sweet) => {
  console.log(`addSweet ran`);
  logger.log(`info`, `We're going to add a sweet! It's ${sweet}`);

  if(!sweet.id)
    return Promise.reject(new Error(`The sweet must have an id`));

  return storage.getAllSweets()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, [...database, sweet]);
    });
};

storage.removeSweet = (id) => {
  console.log(`removeSweet ran`);
  logger.log(`info`, `Deleting a sweet with the id ${id}`);

  return storage.getAllSweets()
    .then(database => {
      return database.filter(sweet => sweet.id !== id);
    })
    .then(filteredDB => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, filteredDB);
    });
};
