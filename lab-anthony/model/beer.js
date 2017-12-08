'use strict';

const uuid = require('uuid/v1');

class Beer {
  constructor(brewery, beerName, beerType){
    this.id = uuid();
    this.timestamp = new Date();
    this.brewery = brewery;
    this.beerName = beerName;
    this.beerType = beerType;
  }
}

module.exports = Beer;
