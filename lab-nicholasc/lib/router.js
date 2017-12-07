'use strict';

const requestParser = require('./request-parser');
const logger = require('./logger');

let routeHandlers = {
  POST: {},
  GET: {},
  PUT: {},
  DELETE: {},
};

const router = module.exports = {};

let logUrlAndCallback = (httpMethod, url, callback)=>{
  logger.log('info', `adding a ${httpMethod} url and callbacck`);
  logger.log('info', url);
  logger.log('info', callback.toString());
};
//url is like api/notes
// callback will be a function with (request, response)
router.get = (url, callback) => {
  logUrlAndCallback('GET', url, callback);
  routeHandlers.GET[url] = callback;
};
router.delete = (url, callback) => {
  logUrlAndCallback('DELETE', url, callback);
  routeHandlers.DELETE[url] = callback;
};
router.put = (url, callback) => {
  logUrlAndCallback('PUT', url, callback);
  routeHandlers.PUT[url] = callback;
};
router.post = (url, callback) => {
  logUrlAndCallback('POST', url, callback);
  routeHandlers.POST[url] = callback;
};

router.route = (request, response) => {
  logger.log('info', 'Routing a Request');
  logger.log('info', 'log the features here');//TODO: log features here
  // console.log('router.js line 42', request);
  requestParser.parse(request)
    .then(request =>{
      //request is parsed now
      let handlerFound = routeHandlers[request.method][request.url.pathname];
      logger.log('info', 'Found the following handler');
      logger.log('info', handlerFound.toString());

      if(handlerFound)
        return handlerFound(request, response);
      else{
        response.writeHead(404);
        response.end();
        return;
      }
    })
    .catch(error => {
      logger.log('info', '__REQUEST_ERROR');
      logger.log('info', error);

      response.writeHead(400);
      response.end();
      return;
    });
};
