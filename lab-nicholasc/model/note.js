'use strict';

const uuid = require( 'uuid/v1');

class Note{
  constructor(title, content){
    //TODO: lets do type checking- probs not here, on submission, but maybe here so so I can have as many models as I wantt
    this.id = uuid();
    this.timestamp = new Date();
    //TODO: add error checks
    this.title = title;
    this.content = content;
  }
}

module.exports = Note;
