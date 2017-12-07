'use strict';

const Planet = require('../model/planet');
const router = require('../lib/router');
const logger = require('../lib/logger');

let planets = [];

let sendStatus = (response,status,message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response,status,jsonData) => {
  logger.log('info',`Responding with a ${status} code and the following data`);
  logger.log('info',jsonData);
  response.writeHead(status,{
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

//           URL           CALLBACK
router.post('/api/planet', (request,response) => {
  // Here, I know that my request has been pre-parsed
  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.name){
    sendStatus(response,400,'name not found');
    return;
  }
  if(!request.body.content){
    sendStatus(response,400,'content not found');
    return;
  }
  //can create my planet since all test pass
  let planet = new Planet(request.body.name,request.body.content);
  planets.push(planet);
  sendJSON(response,200,planet);
});

//FIXME:GET /api/<resource-name> and GET /api/<resource-name>?id={id}
//     with no id in the query string it should respond with an array of all of your resources
// with an id in the query string it should respond with the details of a specifc resource (as JSON)
// if the id is not found respond with a 404

//           URL           CALLBACK
router.get('/api/planet', (request,response) => {
  // Here, I know that my request has been pre-parsed
  if(!request.url.query.id){
    console.log('Hit .get at NO request.url.query.id');
    // sendStatus(response, 200, planets);
    console.log(planets);
    sendJSON(response,200,planets);
    return;
  }
  if (!(planets.find(planet => planet.id === request.url.query.id))) {
    console.log('Hit .get at specific request.body.id NOT in planets');
    // sendStatus(response,200,planets[request.id]);
    sendStatus(response, 404, 'Planet ID not found');
    return;
  } else { //if(request.body.id)
    console.log('Hit .get at specific & correct request.body.id');
    // sendStatus(response,200,planets[request.id]);
    sendJSON(response, 200, planets[0]);
    return;
  }
});


// router.get = (url, callback) => {
//   logUrlAndCallback('GET', url, callback);
//   routeHandlers.GET[url] = callback;
// };

// router.post = (url, callback) => {
//   logUrlAndCallback('POST', url, callback);
//   routeHandlers.POST[url] = callback;
// };

// router.put = (url, callback) => {
//   logUrlAndCallback('PUT', url, callback);
//   routeHandlers.PUT[url] = callback;
// };

// router.delete = (url, callback) => {
//   logUrlAndCallback('DELETE', url, callback);
//   routeHandlers.DELETE[url] = callback;
// };

// DONE:POST / api / <resource-name>
//   pass data as stringifed JSON in the body of a POST request to create a new resource
// on success respond with a 200 status code and the created planet
// on failure due to a bad request send a 400 status code

// TODO:DELETE /api/<resource-name?id={id}>
// the route should delete a planet with the given id
// on success this should return a 204 status code with no content in the body
// on failure due to lack of id in the query respond with a 400 status code
// on failure due to a resource with that id not existing respond with a 404 status code
