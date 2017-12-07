'use strict';

const uuid = require('uuid/v1');

class Book {
  constructor(title, author){
    this.id = uuid();
    this.timestamp = new Date();
    this.title = title;
    this.author = author;
  }
}

module.exports = Book;