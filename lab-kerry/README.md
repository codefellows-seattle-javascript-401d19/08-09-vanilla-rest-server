ab 07: Vanilla HTTP Server
======

## Motivation
To build a RESTFUL API server which will use GET, POST, and DELETE paths to render data in the browser or respond to API calls.

## Technologies Used
-Node.js (ES6 notation where possible)
-Production NPM packages (winston and uuid)
-Development NPM packages (dotenv, eslint, jest, and superagent)

## How to Use

To start this app, clone this repo from 

  `http://www.github.com/kerrynordstrom/08-09-vanilla-rest-server`

install all necessary packages with 

  `npm install`

  This project is able to start your node server upon running any tests.  To do this, type

  `node run test`

## Modules

### Server Module 
The server module is responsible for creating an http server defining all route behavior and exporting an interface for starting and stopping the server. It exports an object with `start` and `stop` methods, which most interestingly have auto start and stop functionality built in. 

### Request Parser Module
The request parser module is responsible for returning a promise that parses an incoming url, querystring (if applicable), and a POST or PUT body (if applicable). It exports an object with this parsed information.

### Logger Module
In order to best encapsulate the winston logging package functionality, the logger module includes the recommended winston severity scale and pathways for logs.

### Router Module
The requestParser module is contained in this module, where it will hand requested routes to specified CRUD objects which are assigned to a routeHandler variable.  The route module declares CRUD functionality with callbacks handed to the routeHandler object depending on which CRUD operation-specific URL is inserted and additionally points to a logger function which will record any activity at the instantiated route. 

### Mountain Module
The mountain module exports an Object containing a randomly generated `unique id`, `name`, `location`, and `elevation`.  This can then be parsed depending on the requests from any number of routes.

## Routes

#### GET /api/mountains
When a client makes a GET request to `/` the server sends back an array of objects with all available mountain data.


#### GET /api/mountains?id=${mountainId}
When a client makes a GET request to /api/mountains?id={mountainId} the server parses the querystring and sends back an array with one object containing that specific id.  If no id is found, the server will respond with a `404` status code.

#### POST /api/mountains
When a client makes a POST request to /api/mountains?id={mountainId} the server parses the querystring and creates a stringified JSON object in the body of a POST request, which will create an object in the mountain module.  On success, the server will respond with a `200` status and on failure due to a bad request, will respond with a `400` status.

```
[ { id: '38549340-db21-11e7-b34d-8d9cbe6c502d',
        name: 'Mt. Evans',
        location: 'Colorado',
        elevation: '14,235' } ]
```


#### DELETE /api/mountains?id=${mountainId}
When a client makes a DELETE request to /api/mountains and provides an existing id, the server will return a `204` success response.  If the client provides an incorrect id, the server will return a `404` response.  If no id is presented at all, the server will return a `400` response.




