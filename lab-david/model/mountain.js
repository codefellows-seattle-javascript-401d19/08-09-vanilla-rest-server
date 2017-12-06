'use strict';

const uuid = require('uuid/v1');

class Mountain{
  constructor(name,state,hiking,range){
    this.id = uuid();

    this.name = name;
    this.state = state;
    this.hiking = hiking;
    this.range = range;
  }
}

module.exports = Mountain;