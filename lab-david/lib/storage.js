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

storage.fetchAll = () => {};
storage.addItem = () => {};
storage.fetchItem = () => {};
storage.deleteItem = () => {};