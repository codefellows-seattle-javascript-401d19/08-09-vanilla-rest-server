'use strict';

const uuid = require('uuid/v1');

class Dogs {
  constructor(legs, isPoodle) {
    this.id = uuid();
    this.timestamp = new Date();
    this.legs = legs;
    this.isPoodle = isPoodle; 
  }
}

module.exports = Dogs;