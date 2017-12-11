'use strict';

const requestParser = require('../lib/request-parser');
const log = require('../lib/logger');

let routeHandlers = {
  POST: { },
  GET: { },
  DELETE: { },
  PUT: { },
};

const router = module.exports = {};

let logUrlAndCallback = (method, url, callback) => {
  log('router', `Adding a ${method} url and callback | url: ${url} | callback: ${callback.toString()}`);
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
  log('router', `Routing a request |  URL: ${request.url}`);

  requestParser.parse(request)
    .then(request => {
      log('router', `${request.method} | ${request.url.pathname}`);
  
      let foundHandler = routeHandlers[request.method][request.url.pathname];

      log('router', 'Found the following handler');
      log('router', `${foundHandler}`);

      if (foundHandler) {
        return foundHandler(request,response);
      }

      response.writeHead(404);
      response.end();
      return;
    })
    .catch(error => {
      log('info', `__REQUEST_ERROR | ${error}`);

      response.writeHead(400);
      response.end();
      return;
    });
};
