![cf](https://i.imgur.com/7v5ASc8.png) Heroes RESTful API with local storage
======

## Building Simple RESTful API
* Basic RESTful API that will use GET, POST and DELETE methods to:

  * display all data (GET method)
  * display single object from database if correct id is passed to the request  (GET method)
  * add object to database
  * delete object from the database

## Code Style
* Javascript + ES6


## Tech / framework used
* [npm package uuid](https://www.npmjs.com/package/uuid) to generate random user id.
* [npm package winston](https://www.npmjs.com/package/winston) as a logging library.
* [npm package jest](http://facebook.github.io/jest/) used for TDD
* [npm package dotenv](https://www.npmjs.com/package/dotenv) for loading env variables.
* [npm package superagent](https://www.npmjs.com/package/superagent) for testing http requests
* [npm package fs-extra](https://www.npmjs.com/package/fs-extra) node js file system methods
* [httpie](https://httpie.org/) to communicate with server using POST/DELETE method

## Installation and How To Use

  * Fork || clone this repo to you computer.

  * Run `npm install`

  * Make sure that env port is set to `3000` (add .env folder to repo and insert `PORT=3000` as well as `STORAGE_PATH={repo file path/db.json}`) and start your local server running `nmp start` command.


  * To **ADD** more heroes:

     * When a client makes a POST request to /api/heroes it should send JSON that includes `'{"name" : "<name>", "superPower" : "<superPower>"}'`.
     Make sure that httpie is installed on your computer first. `brew install httpie` for MaxOS users.

     * run this command in CLI and new **HERO** will be added to the page `http://localhost:3000/api/heroes`.

     * `echo '{"name" : "{name}", "superPower" : "{superPower}"}' | http POST localhost:3000/api/heroes`

   * Proceed to the browser to view all available heroes.

* To **DELETE** a hero:

    * When a client makes a DELETE request to /api/heroes?id={id} API will check if hero's id is matching what's in database and if so DELETE that hero.

    * run this command in CLI and new **HERO** will be DELETE from the page `http://localhost:3000/api/heroes`.

    * Proceed to the browser to view all available heroes.


## Licence
MIT © Pedja Josifovic
