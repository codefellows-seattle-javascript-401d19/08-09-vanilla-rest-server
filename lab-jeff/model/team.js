'use strict';

const uuid = require('uuid/v1');

class Team{
  constructor(sport, city, nickname){
    this.id = uuid();
    //TODO: error checking
    this.sport = sport;
    this.city = city;
    this.nickname = nickname;
  }
}

module.exports = Team;
