'use strict';

const uuid = require('uuid/v1');

class Wizard {
    constructor(name,origin){
        this.id = uuid();
        this.timestamp = new Date();
        this.name = name;
        this.origin = origin;
    }
}

module.exports = Wizard;

