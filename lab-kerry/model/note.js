'use strict';

const uuid = require('uuid/v1');

// //make new class here 
// ex:
// class Cat {
	
// }

class Note {
  constructor(title, content) {
    //by design, title and content would be a string
    this.id = uuid();
    this.timestamp = new Date();

    //error checking could be done below
    this. title = title;
    this.content = content;
  }
} //no semicolon needed in class syntax

module.exports = Note;
