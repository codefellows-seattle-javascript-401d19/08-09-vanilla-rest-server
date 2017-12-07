'use strict';

const uuid = require('uuid/v1');


class Mountain {
  constructor(name, location, elevation) {
    this.id = uuid();
    this.name = name;
    this.location = location;
    this.elevation = elevation;
  }
}

module.exports = Mountain;
