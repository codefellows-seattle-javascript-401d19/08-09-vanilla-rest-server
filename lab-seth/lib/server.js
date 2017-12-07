'use strict';

const http = require('http');
const logger = require('./logger');
const router = require('./router');

process.env.PORT = 3000;

require('../route/planet-router');

const app = http.createServer(router.route);

let isServerOn = false;

const server = module.exports = {};

server.start = () => {
  return new Promise((resolve,reject) => {
    if(isServerOn){
      logger.log('error','__SERVER_ERROR__ server is already running');
      return reject(new Error('__SERVER_ERROR__ server is already running'));
    }
    if(!process.env.PORT){
      logger.log('error','__SERVER_ERROR__ PORT variable is not configured');
      return reject(new Error('__SERVER_ERROR__ PORT variable is not configured'));
    }
    app.listen(process.env.PORT, error => {
      if(error)
        return reject(error);

      //if we got here. Everything is ok
      isServerOn = true;
      logger.log('info',`Server is online on port ${process.env.PORT}`);
      console.log('info',`Server is online on port ${process.env.PORT}`);
      return resolve();
    });
  });
};

server.stop = () => {
  return new Promise((resolve,reject) => {
    if(!isServerOn){
      logger.log('error','__SERVER_ERROR__ server is already off');
      return reject(new Error('__SERVER_ERROR__ server is already off'));
    }
    app.close(error => {
      if(error){
        logger.log('error',`__SERVER_ERROR__ server can't be shut down`);
        //lines like this will break if the object is too big
        logger.log('error',error);

        return reject(error);
      }
      isServerOn = false;
      return resolve();
    });
  });
};

// TODO:POST / api / <resource-name>
//   pass data as stringifed JSON in the body of a POST request to create a new resource
// on success respond with a 200 status code and the created planet
// on failure due to a bad request send a 400 status code
// TODO:GET /api/<resource-name> and GET /api/<resource-name>?id={id}
//     with no id in the query string it should respond with an array of all of your resources
// with an id in the query string it should respond with the details of a specifc resource (as JSON)
// if the id is not found respond with a 404
// TODO:DELETE /api/<resource-name?id={id}>
// the route should delete a planet with the given id
// on success this should return a 204 status code with no content in the body
// on failure due to lack of id in the query respond with a 400 status code
// on failure due to a resource with that id not existing respond with a 404 status code
