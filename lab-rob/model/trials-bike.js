'use strict';

const uuid = require('uuid/v1');

class TrialsBike {
  constructor(make, model, year, displacement, color) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.displacement = displacement;
    this.color = color;
    this.id = uuid();
    this.timestamp = new Date();
  }
}

module.exports = TrialsBike;