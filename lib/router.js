'use strict';

const router = module.exports = {};

const logger = require(`./logger`);
const requestParser = require(`./requestParser`);

let routeHandlers = {
  GET: {
    'api/sweets' : (request, response) => {
      // if()  // if there is no id query, respond with an array of all the sweets
      // if()  // if there IS an id query, see if it matches the id of anything in the array
      // if yes, respond with the details of the thing with that id
      // if not, respond with a 404
    },
  },
  POST: {
    'api/sweets' : (request, response) => {

    },
    // pass data as stringifed JSON in the body of a POST request to create a new resource
    // on success respond with a 200 status code and the created note
    // on failure due to a bad request send a 400 status code
  },
  DELETE: {
    'api/sweets/?id' : (request, response) => {

    },
    // delete the thing that matches the id given in the query
    // return 204 with no content in body for success
    // return 400 if failed because no id was provided in query
    // return 404 if nothing matches the id provided
  },
};

router.get = (url, callback) => {
  routeHandlers.GET[url] = callback;
};

router.route = (request, response) => {
  logger.log(`info`, `Router is routing a request`);

  requestParser.parse(request)  //parse the response .THEN(do something with the parsed request)
    .then(request => {
      let handlerFromRequest = routeHandlers[request.method][request.url.pathname];
      logger.log(`info`, `The method found was: ${request.method}`);
      logger.log(`info`, `The handler found from the request was: ${handlerFromRequest}`);
    });
};
