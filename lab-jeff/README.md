# Code Fellows 401 Lab 8
The purpose of this lab is to build a basic HTTP server with Vanilla javascript that takes GET, POST, and DELETE requests that read, add, and delete an object from an array.  The object is a sports team with 4 properties: sport, city, nickname, and id (which is assigned by the API).

## Code Style
Standard Javascript with ES6.

## Features
Users can get a list of all teams by sending a GET request with no body.  To get a particular team, send a GET request with a body of ```{id: '<id of team you want>'}```
To put a new team in the array, send a POST request with the body ```{sport: '<sport>', city: '<city>', nickname: '<nickname>'}```
To delete a team from the array, send a DELETE request with the body ```{id: '<id of team to delete>'}```.

## Running the Server
To run the server, download the repo.  Install dependencies via ```npm install```.  Create a folder called '.env' in the root directory of this project and enter ```PORT=<yourport>``` on the first line.  3000 is a typical choice.  Then, ```npm start```.
