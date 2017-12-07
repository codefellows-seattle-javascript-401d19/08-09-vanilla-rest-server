'use strict';

const uuid = require('uuid/v1');

class Wizard {
    constructor(name,spells,origin){
        this.id = uuid();
        this.timestamp = new Date();
        this.name = name;
        this.spells = [];
        this.origin = origin;
    }
}

module.exports = Wizard;

