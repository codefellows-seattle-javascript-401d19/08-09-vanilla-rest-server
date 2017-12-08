'use strict';

const requestParser = require('./request-parser');
const logger = require('./logger');

const routeHandlers = {
  POST: {},
  GET: {},
  DELETE: {},
  PUT: {},
};


const router = module.exports = {};

const logUrlAndCallback = (httpMethod, url, callback) => {
  logger.log('info',`Adding a ${httpMethod} url and callback`);
  logger.log('info',url);
  logger.log('info',callback.toString());
};

router.get = (url, callback) => {
  logUrlAndCallback('GET', url, callback);
  routeHandlers.GET[url] = callback;
};

router.post = (url, callback) => {
  logUrlAndCallback('POST', url, callback);
  routeHandlers.POST[url] = callback;
};

router.put = (url, callback) => {
  logUrlAndCallback('PUT', url, callback);
  routeHandlers.PUT[url] = callback;
};

router.delete = (url, callback) => {
  logUrlAndCallback('DELETE', url, callback);
  routeHandlers.DELETE[url] = callback;
};

router.route = (request, response) => {
  logger.log('info', 'Routing a Request');

  requestParser.parse(request)
    .then(request => {
      let handlerFound = routeHandlers[request.method][request.url.pathname];
      logger.log('info', 'Found the following handler');
      logger.log('info', handlerFound.toString());
      if (handlerFound) {
        return handlerFound(request, response);
      } else {
        response.writeHead(404);
        response.end();
        return;
      }
    })
    .catch(error => {
      logger.log('info', '__REQUEST_ERROR__');
      logger.log('info', error);

      if (request.method === 'GET') {
        response.writeHead(404, { 'Content-Type': 'application/json' });
        response.end();
        return;
      }
      if (request.method === 'POST') {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end();
        return;
      }
      if (request.method === 'DELETE') {
        response.writeHead(400, { 'Content-Type': 'application.json' });
        response.end();
        return;
      }
    });
};
