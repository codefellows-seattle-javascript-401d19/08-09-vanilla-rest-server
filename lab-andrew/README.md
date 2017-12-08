# Lab 08/09 REST API

## Overview

This API is a RESTful Cat API. It exists so you can create virtual cats and retrieve and delete them from memory.

## Getting Started

To get started using this application, familiarity with node and npm, as well as git is assumed. Fork/clone this repo to your machine, and do an npm install. You will need to set up a .env file with the PORT you would like to use (i.e. PORT=3000). To this file you should also add a STORAGE_PATH variable set to the path to the root folder/db.json. Run 'npm start' from the command line to start the server.

## Modules

There is an index.js file which simply requires in the server file runs server.start(). cat-router.js contains most of the functionality of this app. It uses the cat.js model to create new Cat objects when a POST request is submitted. cat-router.js also supplies the functionality which returns the cats when a GET request is submitted, deletes a cat when a DELETE request is submitted, and handles any errors. All that is exported from the server.js file is server.start and server.stop. The request parser (only function exported from the requestParser module) takes the http request, parses the request and returns the type of query and the route to be passed to various other modules. The storage.js file exports an object with four functions attached. These write and read a JSON file in order to persist the memory between sessions. They store the objects created in the form of an array saved as a JSON object. They return the parsed data, so if all data is requested, an array will be returned, and if a single object is requested, a single object will be returned. The delete function parses the JSON, finds the item to be deleted, filters the array so as to not include that item, and writes the new array to the JSON file (overwriting the old file). Delete will also return a success message if the ID does not exist, however it will return an error if no ID is provided.

## Making Requests to the API

 To make a GET request, the path will be '__server_address__/api/cats' and an array of all cat objects will be returned with a success message. If an additional cat ID is supplied as a query string, a specific cat will be returned if that ID exists. A POST request can be made, which expects a JSON object in the form of '{"name":"<cat's name>","says":"<what the cat says>"}' and a new Cat will be created with a unique ID and a birthday (which calls the Date() method to document the time the Cat was created). A DELETE request can be made with the same route as a GET request with an ID; it will delete the cat which has that ID.

## Technology/Credits

This app is being logged with winston and is using superagent and jest for testing server requests. This app is using fs-extra to read and write JSON for persisting storage between sessions.
