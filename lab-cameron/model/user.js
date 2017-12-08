'use strict';

const uuidv1 = require('uuid/v1');

const User = (() => {
  // makes user id and timestamp private / only accessible via getters
  const id = new WeakMap();
  const timestamp = new WeakMap();
  class User {
    constructor(name, description) {
      this.name = name;
      this.description = description;
      this.testId = uuidv1();

      id.set(this, uuidv1());
      timestamp.set(this, new Date());
    }
    getId() {
      return id.get(this);
    }
    getTimestamp() {
      return timestamp.get(this);
    }
  }
  return User;
})();

module.exports = User;
