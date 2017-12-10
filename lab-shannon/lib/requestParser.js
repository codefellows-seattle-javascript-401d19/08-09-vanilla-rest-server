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


    let sentMessage = '';
    request.on('data', (buffer) => {
      sentMessage += buffer.toString();   //if we have data we're dealing with it's going to come in pieces, so gather up all those pieces
    });

    request.on('end', () => {   //once all of the message/data has been received, do a thing
      try{
        if(request.headers['content-type'].indexOf(`application/json`) > -1){
          request.body = JSON.parse(sentMessage);   //remember all those pieces of data we gathered earlier? they're going to be the request body
          return resolve(request);
        }
        else{
          return reject(request);
        }
      }
      catch(error){
        logger.log(`info`, `There was an error: ${error}`);
        return reject(error);
      }
    })
  });
};
