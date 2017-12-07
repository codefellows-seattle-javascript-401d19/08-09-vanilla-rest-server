'use strict';

const uuid = require('uuid/v1');

class Team{
  constructor(sport, city, nickname){
    this.id = uuid();
    this.sport = sport;
    this.city = city;
    this.nickname = nickname;
  }
}

module.exports = Team;
