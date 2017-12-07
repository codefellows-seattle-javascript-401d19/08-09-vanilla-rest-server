'use strict';

const urlModule = require('url');
const logger = require('./logger');
const queryStringModule = require('querystring');


//=======================

const requestParser = module.exports = {};

requestParser.parse = (request) =>{
  return new Promise((resolve, reject) => {

    logger.log('debug', `Original URL : ${JSON.stringify(request.url)}`);
    request.url = urlModule.parse(request.url);
    request.url.query = queryStringModule.parse(request.url.query);
    logger.log('debug', `Parsed URL : ${JSON.stringify(request.url)}`);

    if(request.method !== 'POST' && request.method !== 'PUT')
      return resolve(request);
    let sentText = '';
    request.on('data', (buffer) => {
      sentText += buffer.toString();
    });
    request.on('end', () => {
      try{
        //mutates the request object and creates a body property
        //here we assume this is json
        if(request.headers['Content-Type'].indexOf('application/json') > -1){
          request.body = JSON.parse(sentText);
          return resolve(request); //passes new promise along .then chain
        }else{
          return reject(request);
        }
      }catch(error){
        return reject(error);
      }
    });
  });
};
