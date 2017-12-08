#Day 8 REST api

#What is it?

I enjoy drinking beer. This app lets you keep track of beers you like.
This app allows you to store beers with the required properties brewery, beer name,
and beer style.

#Usage

Currently this is only set up to use server.test.js to create and log beer objects.
When using superagent to post beers, you must follow the convention-
{
  brewery: '<name>',
  beerName: '<beerName>',
  beerType: '<beerType',
}

to make a get request you must use an id to find a beer.

example:
http://localhost:3000/api/beers?id=< valid id >

the same goes for your delete request.

To run tests type npm test in the terminal.

#Dependencies:

"devDependencies":
   eslint : "^4.12.1",
   jest : "^21.2.1",
   superagent: "^3.8.1"

dependencies:
  dotenv : "^4.0.0",
  fs-extra : "^4.0.3",
  uuid : "^3.1.0",
  winston : "^2.4.0"
