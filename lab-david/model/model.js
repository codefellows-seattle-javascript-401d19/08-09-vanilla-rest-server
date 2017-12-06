'use strict';

const uuid = require('uuid/v1');

class Mountain{
  constructor(state,range,hiking,volcano){
    this.id = uuid();

    this.state = state;
    this.range = range;
    this.hiking = hiking;
    this.volcano = volcano;
  }
}

module.exports = Mountain;