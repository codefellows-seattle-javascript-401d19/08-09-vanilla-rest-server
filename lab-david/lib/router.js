'use strict';

const requestParser = require('./request-parser');
const logger = require('./logger');

let routeHandlers = {
  POST :{},
  GET :{},
  PUT :{},
  DELETE :{},
};

const router = module.exports = {};

let logUrlAndCallback = (httpMethod,url,callback) => {
  logger.log('info', `adding a ${httpMethod} url and callback`);
  logger.log('info', url);
  logger.log('info', callback.toString());
};

router.get = (url,callback) => {
  logUrlAndCallback(`GET`,url,callback);
  routeHandlers.GET[url] = callback;
};

router.post = (url,callback) => {
  logUrlAndCallback(`POST`,url,callback);
  routeHandlers.POST[url] = callback;
};

router.put = (url,callback) => {
  logUrlAndCallback(`PUT`,url,callback);
  routeHandlers.PUT[url] = callback;
};

router.delete = (url,callback) => {
  logUrlAndCallback(`DELETE`,url,callback);
  routeHandlers.DELETE[url] = callback;
};

router.route = (request,response) => {
  logger.log(`info`, `Routing a request`);

  requestParser.parse(request)
    .then(request => {
      let handlerFound = routeHandlers[request.method][request.url.pathname];
      logger.log(`info`, `found the following handler`);
      logger.log(`info`, handlerFound.toString());
      if(handlerFound)
        return handlerFound(request,response);
      else{
        response.writeHead(404);
        response.end();
        return;
      }    
    })
    .catch(error => {
      logger.log(`info`, `------>REQUEST_ERROR<------`);
      logger.log(`info`, error);

      response.writeHead(400);
      response.end();
      return;
    });
};