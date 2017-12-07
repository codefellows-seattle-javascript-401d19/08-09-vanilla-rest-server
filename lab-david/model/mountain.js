'use strict';

const uuid = require('uuid/v1');

class Mountain{
  constructor(name,state,hiking,range){
    if(typeof name !== 'string')
      throw TypeError('ERROR - name must be a string');
    if(typeof state !== 'string')
      throw TypeError('ERROR - state must be a string');
    if(typeof hiking !== 'string')
      throw TypeError('ERROR - hiking must be a string');
    if(typeof range !== 'string')
      throw TypeError('ERROR - range must be a string');
    
    this.id = uuid();
    this.name = name;
    this.state = state;
    this.hiking = hiking;
    this.range = range;
  }
}

module.exports = Mountain;