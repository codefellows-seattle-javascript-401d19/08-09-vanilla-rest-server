# 08-09 Vanilla REST Server

Implements a RESTful API using Node.js without express

# Technology Used

- jest
- superagent
- dotenv
- uuid
- winston
- Node.js

# Features

Allows `GET`, `POST` and `DELETE` requests for single or all users provided from
the user model. Updates and retrieves users from a user pool found in user-router.js

# Installation

- Clone this repo
- Run `npm install`
- Run `npm run start` for production or `npm run startDev` for development to start the server

# API Reference

### GET requests
1. GET requests for all users can be done via making requests to `localhost:3000/api/users`
2. GET requests for single users can be done via `localhost:3000/api/users?id=<user-id>`

### POST requests
1. POST requests for single users can be done via `localhost:3000/api/users?id=<user-id>`

### DELETE requests
1. DELETE requests for single users can be done via `localhost:3000/api/users?id=<user-id>`

# Tests

All testing done with jest and superagent

# Credits

Cameron Moorehead - https://github.com/CameronMoorehead

# License

GPL-3.0
