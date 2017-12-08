'use strict';

const logger = require('./logger');
const fsExtra = require(`fs-extra`);

const storage = module.exports = {};

fsExtra.pathExists(process.env.STORAGE_PATH)  //does process.env.STORAGE_PATH exist? This returns a promise
  .then((result) => {
    if(!result){
      fsExtra.writeJSON(process.env.STORAGE_PATH, []);  //if the file doesn't exist yet, make one and put an empty array in it
    }
  })

storage.showAllSweets = () => {
  logger.log(`info`, `All sweets are being retrieved!`);
  return fsExtra.readJSON(process.env.STORAGE_PATH);
};

storage.showSweet = (id) => {
  logger.log(`info`, `Getting the sweet with id: ${id}`);

  return storage.showAllSweets()   //this returns a promise with array of data from STORAGE_PATH file
    .then(database => {
      return database.filter((sweet) => {sweet.id === id})//find & return the thing with the id that matches the id argument
    })
    .then(sweet => {
      if(sweet === undefined)
        throw new Error(`STORAGE_ERROR: nothing found with that id`);

      return sweet;
    })
};

storage.addSweet = (sweet) => {
  logger.log(`info`, `We're going to add a sweet! It's ${sweet}`);

  if(!sweet.id)
    return Promise.reject(new Error(`The sweet must have an id`));

  return storage.showAllSweets()
    .then(database => {
      return fsExtra.writeJSON(process.env.STORAGE_PATH, [...databse, sweet]);
    })
};
//
// storage.removeSweet = (id) => {};
