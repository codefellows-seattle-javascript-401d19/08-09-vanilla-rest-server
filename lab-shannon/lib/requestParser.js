'use strict';

const requestParser = module.exports = {};

const logger = require(`./logger`);
const urlModule = require(`url`);

requestParser.parse = (request) => {
  return new Promise((resolve, reject) => {
    request.url = urlModule.parse(request.url, true);
    if (request.method === `GET`){
      return resolve(request);
    }


    let sentMessage = '';
    request.on('data', (buffer) => {
      sentMessage += buffer.toString();
    });

    request.on('end', () => {
      try{
        if(request.headers['content-type'].indexOf(`application/json`) > -1){
          request.body = JSON.parse(sentMessage);
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
