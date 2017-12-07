'use strict';

const uuid = require('uuid/v1');

let notes = [];

class Note {
  constructor(title, content) {
    this.id = uuid();
    this.timestamp = new Date();
    this.title = title;
    this.content = content; 
  }
}

// class Cat { constructor... } --creation

module.exports = Note;