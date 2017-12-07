'use strict';

const requestParser = module.exports = {};

const logger = require(`./logger`);
const urlModule = require(`url`);

requestParser.parse = (request) => {
  return new Promise((resolve, reject) => {
    request.url = urlModule.parse(request.url, true);   // hey!: using url's built in parse function, get me the value of the url property of the request (please)
    if (request.method === `GET`){
      return resolve(request);    // this resolves to the first .then of requestParser.parse found in router.route
    }
  });
};
