

##  Lab 08: REST API

### Author:
Dalton Carr


#### Request Parser Module

The request parser module returns a promise that parses the request url, querystring, and POST body (as JSON). The request parser module then exports an object containing an instantiated Promise and parsed request.body data.

#### Server Module

The server module is creating an http server, defining route behavior and exporting an interface for starting and stopping the server. The server module exports an object containing start and stop methods. 

The server module requires in http, logger, router, dotenv, and the wizard-router.js file. The server.start and stop methods return a new Promise with resolve and reject parameters. The start method contains an app.listen function that listens for the server start. The server.stop method has an app.close that turns the server off by setting the isServerOn variable to false.

#### Model Module

The model module contains a wizard.js file containing a Wizard class constructor with the properties: id, timestamp, name and origin.

#### Route Module

##### ```wizard-router.js```

wizard-router.js requires in the Wizard object, router module, and the logger module. Inside the module, there are functions declared for sendStatus and for sendJSON to be used as success/failure statuses. There are three router methods: ```router.post```, ```router.get``` and ```router.delete```.

##### ```router.js```

router.js requires in requestParser and logger. In this file an object called routeHandlers is declared containing four properties: ```POST```, ```GET```, ```DELETE``` and ```PUT```. 

#### Logger Module

In this module, our logger winston is required in and exported as logger, making it a seperate module and easy to access for logging.

#### Test Module

server.test.js contains three tests for each method: ```POST```, ```GET``` and ```DELETE```. 


### Tech/Framework used

* JavaScript / ES6
* Node.js
* Jest
* Eslint
* Winston
* Superagent
* uuid
* dotenv

### License

MIT © Dalton Carr
