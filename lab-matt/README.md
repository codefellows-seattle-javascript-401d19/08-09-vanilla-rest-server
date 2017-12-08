# 09: REST Server
Description: **Lab 09 of Code Fellows JavaScript 401d19** </br>
Author: **Matthew LeBlanc** </br>
Date: **12/06/17**

## Features
This lab is a basic RESTful HTTP server, similar to `express` that has GET, POST, and PUT routes with test functions for storing data.

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


-------------------------------------
## Documentation

Document all of your server endpoints. Explain expected HTTP request input and the corresponding server responses. Also explain server responses for bad requests and server errors.

## Configuration 
* Add a STORAGE_PATH env variable to your .env file
