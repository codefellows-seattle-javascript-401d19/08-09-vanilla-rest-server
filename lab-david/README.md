## Vanilla HTTP Server


## Motivation
I was motivated by an extreme desire to learn web development which led me to enroll in this program which ultimately led me to this assignment. 

## Build status

[![Build Status](https://travis-ci.org/akashnimare/foco.svg?branch=master)](https://travis-ci.org/akashnimare/foco)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/akashnimare/foco?branch=master&svg=true)](https://ci.appveyor.com/project/akashnimare/foco/branch/master)

## Tech/framework used
Node.JS, Javascript, ESLint, Jest, Faker, Winston, Dotenv, cowsay, superagent

## Features
Well you should be able to run cowsay when you go to localhost:3000/cowsay but its not routing correctly. 

## Installation
Clone or fork this repo to your local machine then install the npm dependencies necessary to run this guy. 

## Tests
There are two tests right now, making sure the POST request responds with a 400 error message if something goes wrong and a 200 status message and body if there are no errors. 

## How to use?
Once you install the dependencies you should be able to run `node index.js` to start your server. It will be running on port 3000 so got your browser and type in http://localhost:3000 to access. 

## Functions 
-If you go to /cowsay and add in a query string the cow should say it. IF you dont add a query string then the cow wont say it.
-If you go to /cowsay it should print out a cow in the browser. 

## Contribute

If anyone wants to help me out, feel free to open a pull request and send it over. PRs will be answered in the order they are received. 

## Credits
Mad props to anyone who helped me and my parents for birthing me.

#### Anything else that seems useful
Soylent isn't that bad. 

## License
MIT License