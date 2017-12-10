'use strict';

const router = module.exports = {};

const logger = require(`./logger`);
const requestParser = require(`./requestParser`);

let routeHandlers = {
  GET: {},
  POST: {},
  DELETE: {},
};

router.get = (url, callback) => {
  routeHandlers.GET[url] = callback;
};

router.post = (url, callback) => {
  routeHandlers.POST[url] = callback;
};

router.delete = (url, callback) => {
  routeHandlers.DELETE[url] = callback;
};


router.route = (request, response) => {
  logger.log(`info`, `Router is routing a request`);
  requestParser.parse(request)
    .then(request => {
      let handlerFromRequest = routeHandlers[request.method][request.url.pathname];

      if(handlerFromRequest){
        return handlerFromRequest(request, response);
        logger.log(`info`, `The method found was: ${request.method}`);
        logger.log(`info`, `The url pathname found was: ${request.url.pathname}`);
        logger.log(`info`, `The handler found from the request was: ${handlerFromRequest.toString()}`);
      }else{
        response.writeHead(404);
        response.end();
      }
    })
    .catch(error => {
      logger.log(`info`, `There was an error handling the request`);
      logger.log(`info`, error);

      response.writeHead(400);
      response.end();
      return;
    });
};
