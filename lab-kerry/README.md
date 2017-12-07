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
The request parser module is responsible for parsing incoming data and concatenating it, once parsed to send as a result to the server. It exports an object with this parsed information.  This module returns a new Promise each time it parses information.  

### Logger Module
In order to best encapsulate the winston logging package functionality, the logger module includes the recommended winston severity scale and pathways for logs.

### Router Module
The requestParser module is contained in this module, where it will hand requested routes to specified CRUD objects which are assigned to a routeHandler variable.  The route module declares CRUD functionality with callbacks handed to the routeHandler object depending on which CRUD operation-specific URL is inserted and additionally points to a logger function which will record any activity at the instantiated route. 

###

## Routes

#### GET 
When a client makes a GET request to `/` the server sends back html with a project description and a link to /cowsay.
``` html
<!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
   <header>
     <nav>
       <ul> 
         <li><a href="/cowsay">cowsay</a></li>
       </ul>
     </nav>
   <header>
   <main>
     <!-- project description -->
   </main>
  </body>
</html>
```

#### GET /cowsay?text={message}
When a client makes a GET request to /cowsay?text={message} the server parses the querystring and passes this message as an object with a text key and string value to the cowsay .say method. This is represented by a rendered HTML page with a cowsay cow speaking the value of the text query. If there is no text query the cow message says `'Give me something to say!'`. 
``` html
<!DOCTYPE html>
<html>
  <head>
    <title> cowsay </title>  
  </head>
  <body>
    <h1> cowsay </h1>
    <pre>
      <!-- cowsay.say({text: req.query.text}) -->
    </pre>
  </body>
</html>
```

#### POST /api/cowsay 
When a client makes a POST request to /api/cowsay a JSON object is sent that includes `{"text": "<message>"}`. 

#### Server Responses


* A response for a valid Request has a status code of 200 and the JSON body will say:

``` json 
{
  "content": "<cowsay cow text>" 
}
```

* A response for an invalid Request has a status code of 400 and the JSON body:
```
{
  "error": "invalid request: text query required"
}
```


## Feature Tasks  
For this assignment you will be building a RESTful HTTP server. The server will store all resources in memory.

#### Request Parser
The request parser module should return a promise that parses the request url, querystring, and  POST or PUT body (as JSON).

#### Model
In the model/ directory create a constructor for a resource (that is different from the class lecture resource). The model must include 4 properties, including an `id` property generated using node uuid.

#### Server Endpoints
Create the following routes for performing CRUD operations on your resource
* `POST /api/<resource-name>` 
  * pass data as stringifed JSON in the body of a **POST** request to create a new resource
  * on success respond with a 200 status code and the created note 
  * on failure due to a bad request send a 400 status code
* `GET /api/<resource-name>` and `GET /api/<resource-name>?id={id}` 
  * with no id in the query string it should respond with an array of all of your resources
  * with an id in the query string it should respond with the details of a specifc resource (as JSON)
    * if the id is not found respond with a 404
* `DELETE /api/<resource-name?id={id}>` 
  * the route should delete a note with the given id 
  * on success this should return a 204 status code with no content in the body
  * on failure due to lack of id in the query respond with a 400 status code
  * on failure due to a resource with that id not existing respond with a 404 status code

## Tests
* Write tests to ensure the `/api/resource-name` endpoint responds as described for each condition below:
  * `GET`: test 404, it should respond with 'not found' for valid requests made with an id that was not found
  * `GET`: test 200, it should contain a response body for a request made with a valid id
  * `POST`: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
  * `POST`: test 200, it should respond with the body content for a post request with a valid body
