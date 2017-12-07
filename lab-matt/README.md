# 08: REST Server
Description: **Lab 08 of Code Fellows JavaScript 401d19** </br>
Author: **Matthew LeBlanc** </br>
Date: **12/06/17**

## Features
This lab is a basic RESTful HTTP server, similar to `express` that has GET, POST, and PUT routes with test functions for server storage.

#### Usage
1. `cd` into the lab-matt repository
2. Make sure to install all the required packages - `npm install`
  - `dotenv`
  - `http`
  - `superagent`
  - `uuid`
  - `winston` </br>
<u>**Dev List**</u>
  - `eslint`
  - `jest`
3. create a `.env` with 'PORT=<port#>' file OR `export PORT=<port#>`
4. in the terminal, run `npm run test` to start and test server
5. Alternatively write an `index.js` that runs `server.start()`