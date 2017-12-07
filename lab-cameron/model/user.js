'use strict';

const uuidv1 = require('uuid/v1');

const User = (() => {
  // makes user id and timestamp private / only accessible via getters
  const id = uuidv1();
  const timestamp = new Date();
  class User {
    constructor(name, description) {
      this.name = name;
      this.description = description;
    }
    getId() {
      return id;
    }
    getTimestamp() {
      return timestamp;
    }
  }
  return User;
})();

module.exports = User;
