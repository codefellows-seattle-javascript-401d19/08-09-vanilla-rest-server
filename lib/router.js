'use strict';

const router = module.exports = {};

const logger = require(`./logger`);
const requestParser = require(`./requestParser`);

let routeHandlers = {
  GET: {
    '/api/sweets' : (request, response) => {
      logger.log(`info`, `Routing a GET request without query parameters`);
      response.writeHead(200, {
        'Content-Type' : `application/json`
        }
      );
      response.write();
      response.end();
    },
    // '/api/sweets/id' : (request, response) => {
    //   if(there is something with that id){
    //     response.writeHead(200, {
    //         'Content-Type' : `text/html`
    //       }
    //     );
    //     response.write(information for the item that matches the id);
    //     response.end();
    //   }
    //   else if(nothing has that id){
    //     response.writeHead(404, {
    //       'Content-Type' : `text/html`
    //       }
    //     );
    //     response.write(`Nothing found: There is nothing matching your search`);
    //     response.end();
    //   }
    // },
    // if there is no id query, respond with an array of all the sweets
    // if there IS an id query, see if it matches the id of anything in the array
        // if yes, respond with the details of the thing with that id
        // if not, respond with a 404
  },
  POST: {
    '/api/sweets' : (request, response) => {
      response.writeHead(200, {
        'Content-Type' : 'application/json'
      });
      response.write(JSON.stringify(request.body));
      response.end();
    },
    // on failure due to a bad request send a 400 status code
  },
  DELETE: {
    // '/api/sweets/?id' : (request, response) => {

    },
    // delete the thing that matches the id given in the query
    // return 204 with no content in body for success
    // return 400 if failed because no id was provided in query
    // return 404 if nothing matches the id provided
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

  requestParser.parse(request)  //parse the response .THEN(do something with the parsed request)
    .then(request => {
      let handlerFromRequest = routeHandlers[request.method][request.url.pathname];

      if(handlerFromRequest){
        return handlerFromRequest(request, response);
        logger.log(`info`, `The method found was: ${request.method}`);
        logger.log(`info`, `The url pathname found was: ${request.url.pathname}`);
        logger.log(`info`, `The handler found from the request was: ${handlerFromRequest.toString()}`);
      }
    })
    .catch(error => {
      logger.log(`info`, `There was an error handling the request`);
      logger.log(`info`, error);
    });
};
