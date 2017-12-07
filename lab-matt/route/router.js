'use strict';

const requestParser = require('../lib/request-parser');
const log = require('../lib/logger');

let routeHandlers = {
  POST: {

  },
  GET: {

  },
  DELETE: {

  },

  // add routes
  PUT: {

  },
};

const router = module.exports = {};

let logUrlAndCallback = (method, url, callback) => {
  log('info', `Adding a ${method} url and callback \nurl: ${url} \ncallback: ${callback.toString()}`);
};
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
  log('info', `Routing a request \n URL: ${request.url}`);

  requestParser.parse(request)
    .then(request => {
      let foundHandler = routeHandlers[request.method][request.url.pathname];

      log('Found the following handler');
      log(foundHandler.toString());

      if (foundHandler) {
        return foundHandler(request,response);
      }

      response.writeHead(404);
      response.end();
      return;
    })
    .catch(error => {
      log('info', `__REQUEST_ERROR \n${error}`);

      response.writeHead(400);
      response.end();
      return;
    });
};
