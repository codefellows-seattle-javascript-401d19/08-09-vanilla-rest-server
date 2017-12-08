'use strict';

const uuid = require('uuid/v1');

class Team{
  constructor(sport, city, nickname){
    this.id = uuid();
    //jeff - data testing could go here
    this.sport = sport;
    this.city = city;
    this.nickname = nickname;
  }
}

module.exports = Team;
