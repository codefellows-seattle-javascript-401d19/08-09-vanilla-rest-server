'use strict';

const uuid = require('uuid/v1');

class Cat {
  // vinicio - By design, title and content would be a string
  constructor(name, says){
    this.id = uuid();
    this.birthday = new Date();

    // vinicio - error checking could be here
    this.name = name;
    this.says = says;
  }
}

module.exports = Cat;
