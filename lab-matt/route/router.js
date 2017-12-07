'use strict';

const requestParser = require('./requestParser');
const logger = require('./logger');

let routeHandlers = {
  POST: {

  },
  GET: {

  },
  DELETE: {
    
  },

  // add routes
  Put: {

  },
};

const router = module.exports = {};

let logUrlAndCallback = (httpMethod, url, callback) => {
  logger.log('info', `Adding a ${method} url and callback \nurl: ${url} \ncallback: ${callback.toString()}`);
}
// url will be something like 'api/notes'
// callback = function(request, response){ }
router.get = (url, callback) => {
  logUrlAndCallback('GET', url, callback);
  routeHandlers.GET[url] = callback;
};

router.post = (url, callback) => {
  logUrlAndCallback('POST', url, callback);
  routeHandlers.GET[url] = callback;
};

router.put = (url, callback) => {
  logUrlAndCallback('PUT', url, callback);
  routeHandlers.GET[url] = callback;
};

router.delete = (url, callback) => {
  logUrlAndCallback('DELETE', url, callback);
  routeHandlers.GET[url] = callback;
};

router.route = (request, response) => {
  logger.log('info', `Routing a request \n URL: ${request.url}`);

  requestParser.parse(request)
    .then(request => {
      let foundHandler = routeHandlers[request.method][request.url.pathname];

      logger.info('Found the following handler');
      logger.info(foundHandler.toString());

      if (foundHandler) {
        return foundHandler(request,response);
      }
      
      response.writeHead(404);
      response.end();
      return;
    })
    .catch(error => {
      logger.log('info', `__REQUEST_ERROR \n${error}`);

      response.writeHead(400);
      response.end();
      return;
    });
}