## Purpose

This program creates a RESTful HTTP server which stores resources (sweets) in a JSON file. Users can access, add, or remove sweets via the sweets router.

## How To Use
* From your command line run "npm install" to install all of the dependencies.
* To install jest for testing run "npm i -s jest". You will then be able to use the command 'npm test' to start the server and execute all tests in the test files.

## Route Operations
* router.get: The url may include a query with a uuid. If no id is provided the entire collection of sweet objects is returned. If an id is provided only the sweet with the matching id is returned. If no sweet is found with the specified id a 404 error will occur.

* router.post: The object sent must be a valid Sweet object with properties 'name', 'hasChocolate', and 'temperature' specified or a 404 error will occur. A uuid should not be included in the object body- one will be assigned once the object is validated. If the object is valid it will be added to the collection of sweets.

* router.delete: The url must include a valid uuid matching a Sweet object in the collection. If a matching id is found the object will be removed from the collection and the response will be a 204 status. If not matching id is found a 404 error will occur. If no id is provided a 400 error will occur.

## Technologies Used
* node
* fs-extra
* uuid
* jest
* eslint
* winston
* superagent
* dotenv
* ES6

## Credits
* Vinicio Vladimir Sanchez Trejo & the Code Fellows curriculum provided the base .eslintrc, .eslintignore, .gitignore, index.js, log.json, and server.js files upon which the command functions were built.
* My fellow 401JS classmates for help problem solving and debugging.
