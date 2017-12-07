'use strict';

const uuid = require('uuid/v1');
const faker = require('faker');

//TODO: change constructor to your own and have at least 4 properties
class Planet{
  //By design, name and content would be a string
  constructor(name,content){
    this.id = uuid();
    this.discoverDate = faker.date.past();

    //error/typechecking checking could be here
    this.name = name;
    this.content = content;
  }
}

module.exports = Planet;