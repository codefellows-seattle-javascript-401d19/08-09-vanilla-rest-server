# 09: REST Server
Description: **Lab 08-09 of Code Fellows JavaScript 401d19** </br>
Author: **Matthew LeBlanc** </br>
Date: **12/07/17**

## Features
This lab is a basic RESTful HTTP server, similar to `express` that has GET, POST, and PUT routes with test functions for storing data.

### Configuration
```
.env
PORT=<your choice of port>
STORAGE_PATH=<repo_location>/08-09-vanilla-rest-server/lab-matt/data/dogs.json
```

#### Usage
1. `cd` into the lab-matt repository
2. Make sure to install all the required packages - `npm install`
  - `dotenv`
  - `fs-extra`
  - `http`
  - `superagent`
  - `uuid`
  - `winston` </br>
<u>**Dev List**</u>
  - `eslint`
  - `jest`
3. create a `.env` with 'PORT=<port#>' file OR `export PORT=<port#>`
4. in the terminal, run `npm run test` to start and test server
</br> **data my not look like it's saving because the test is running a delete function**
5. Alternatively write an `index.js` that runs `server.start()`

## Server End Points
```
POST: http://localhost:${PORT}/api/dogs

GET: http://localhost:${PORT}/api/dogs  =>  array of all dogs
GET: http://localhost:${PORT}/api/dogs?id=${id}  =>  specific dog as object

DELETE: http://localhost:${PORT}/api/dogs?id=${id}  => deletes specific dog
```

### Bad Requests
```
POST: 400 _ if no proper dog object {legs: <number>, isPoodle: <boolean>}
GET: 404 _ if id does not match .../dogs?id=1234
DELETE: 400 _ if no id given
DELETE: 404 _ if no matching id
```
