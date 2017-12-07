# Code Fellows: Seattle 401 JavaScript - 401d19


##  Lab 08: REST API

### Author:
 Catherine Looper

### Motivation

In this project, I built a RESTful (Hypertext Transfer Protocol) HTTP server. This server handles GET, POST, and DELETE requests/responses.

### Build

#### Request Parser Module

The request parser module returns a promise that parses the request url, querystring, and POST body (as JSON). The request parser module then exports an object containing an instantiated Promise and parsed request.body data.

#### Server Module

The server module is creating an http server, defining route behavior and exporting an interface for starting and stopping the server. The server module exports an object containing start and stop methods. 

The server module requires in http, logger, router, dotenv, and the book-router.js file. The server.start and stop methods return a new Promise with resolve and reject parameters. The start method contains an app.listen function that listens for the server start. The server.stop method has an app.close that turns the server off by setting the isServerOn variable to false.

#### Model Module

The model module contains a book.js file containing a Book class constructor with the properties: id, timestamp, title, and author. The Book object is exported. 

#### Route Module

##### ```book-router.js```

book-router.js requires in the Book object, router module, and the logger module. Inside the module, there are functions declared for sendStatus and for sendJSON to be used as success/failure statuses. There are three router methods: ```router.post```, ```router.get``` and ```router.delete```. These methods each handle their corresponding method and send the appropriate response based on the input. 

##### ```router.js```

router.js requires in requestParser and logger. In this file an object called routeHandlers is declared containing four properties: ```POST```, ```GET```, ```DELETE``` and ```PUT```. The router object is being exported from this file. The router object has those same four methods: ```POST```, ```GET```, ```DELETE``` and ```PUT``` with the parameters ```(url, callback)```. This module is responsible for handling the different method requests and routing each request through to the correct method.

#### Logger Module

In this module, our logger winston is required in and exported as logger. This way, I can require in logger on other files without rewriting the code.

#### Test Module

server.test.js contains three tests for each method: ```POST```, ```GET``` and ```DELETE``` for a total of nine tests. 

### Limitations

To use this app - it is assumed that the user has familiarity with the tech and frameworks listed below. 

### Code Style

Standard JavaScript with ES6

### Tech/Framework used

* JavaScript / ES6
* Node.js
* Jest
* Eslint
* Winston
* Superagent
* uuid
* dotenv

### How to use?

* Step 1. Fork and Clone the Repository.
* Step 2. ```npm install```.
* Step 3. ```npm run start``` (to start the server).
* Step 4. to test the API run the command ```npm run test```. (Make sure that a server is not already running)

#### Post Request

* Step 1. To test a post request, first start the server
* Step 2. Type the command ```$ echo '{"title":"Harry Potter","author":"J.K. Rowling"}' | http POST http://localhost:3000/api/books```
* Step 3. You should receive a status code of 200 and a valid JSON object as seen below:

```{"author": "J.K. Rowling","id":"da4c4280-db10-11e7-9aa6-cd4358c1c5ce","timestamp":"2017-12-07T05:38:28.648Z","title": "Harry Potter"}```


### Credits

* Code Fellows / Vinicio Vladimir Sanchez Trejo for providing the starter code.
* Andrew Bloom and I worked through the lab together.

### License

MIT © Catherine Looper