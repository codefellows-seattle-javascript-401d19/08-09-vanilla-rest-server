'use strict';

const fsPlus = require('fs-extra');
const log = require('./logger');

require('dotenv').config();
const STORAGE_PATH = process.env.STORAGE_PATH;

const storage = module.exports = {};

fsPlus.pathExists(STORAGE_PATH)
  .then(success => {
    if (!success) {
      log('verbose', 'STORAGE - creating an empty file');
      fsPlus.writeJSON(STORAGE_PATH, []);
    }
  });

// ============= GET ALL FROM DATABASE =============
storage.fetchAll = () => { 
  log('verbose', 'STORAGE - fetching files');
  return fsPlus.readJSON(STORAGE_PATH);
};

// ============= ADD TO DATABASE =============
storage.addItem = (item) => {
  log('verbose', 'STORAGE - adding item');

  if (!item.id) 
    return Promise.reject(new Error('__STORAGE_ERROR__ item must have an id'));

  return storage.fetchAll()
    .then(database => {
      fsPlus.writeJSON(STORAGE_PATH, [...database, item]);
      return item;
    });
};

// ============= GET ONE ITEM =============
storage.fetchOne = (id) => {
  log('verbose', `STORAGE - fetching file by ID: ${id}`);
  
  return storage.fetchAll()
    .then(database => {
      return database.find(each => each.id === id);
    })
    .then(singleItem => {
      if (singleItem === undefined) {
        throw new Error(`__STORAGE_ERROR__ item not found with ID: ${id}`);
      }
      return singleItem;
    })
    .catch(error => error);
};

// ============= DELETE ONE ITEM =============
storage.deleteItem = (id) => {
  log('verbose', `STORAGE - deleting item with ID: ${id}`);

  return storage.fetchAll()
    .then(allItems => {
      let deleted = allItems.find(each => each.id === id);
      if (deleted) {
        allItems.splice(allItems.indexOf(deleted));
        return {
          allItems: allItems,
          deleted: deleted,
        };
      } else {
        throw new Error(`__STORAGE_ERROR__ item not found with ID: ${id}`);
      }
    })
    .then(object => {
      fsPlus.writeJSON(STORAGE_PATH, object.allItems);
      return object;
    })
    .catch(error => error);
};