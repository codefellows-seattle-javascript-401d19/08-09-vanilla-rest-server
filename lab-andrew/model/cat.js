'use strict';

const uuid = require('uuid/v1');

class Cat {
  constructor(name, says){
    this.id = uuid();
    this.birthday = new Date();
    this.name = name;
    this.says = says;
  }
}

module.exports = Cat;
