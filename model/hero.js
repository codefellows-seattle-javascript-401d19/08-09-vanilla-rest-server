'use strict';

const uuid = require('uuid/v1');

class Hero{

  constructor(name, superPower){
    this.id = uuid();
    this.timestamp = new Date();
    this.name = name;
    this.superPower = superPower;
  }
}

module.exports = Hero;
