'use strict';

const uuid = require(`uuid/v1`);

class Sweet {

  constructor(name, hasChocolate, temperature){
    this.id = uuid();
    this.name = name;
    this.hasChocolate = hasChocolate;
    this.temperature = temperature;
  }
}

module.exports = Sweet;
