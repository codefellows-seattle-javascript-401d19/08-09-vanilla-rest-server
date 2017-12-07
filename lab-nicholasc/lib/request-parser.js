'use strict';

const urlModule = require('url');
const logger = require('./logger');


//-----------------------

const requestParser = module.exports = {};

requestParser.parse = (request) =>{
  return new Promise((resolve, reject) => {

    logger.log('debug', `Original URL : ${JSON.stringify(request.url)}`);
    request.url = urlModule.parse(request.url, true);
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
        if(request.headers['content-type'].indexOf('application/json') > -1){
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




//     let sentText = '';
//     request.on('data',(buffer) => {
//       sentText += buffer.toString();
//     });
//
//     request.on('end',() => {
//       try{
//         // vinicio - this is mutating the request object, and creating an
//         //           body property
//         //           Here, we were ASSUMING that  sentText is JSON
//         if(request.headers['content-type'].indexOf('application/json') > -1){
//           request.body = JSON.parse(sentText);
//           return resolve(request);
//         }else{
//           return reject(request);
//         }
//       }catch(error){
//         return reject(error);
//       }
//     });
//   });
// };
