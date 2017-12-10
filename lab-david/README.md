## Vanilla REST Server with persistence
This is a server built from scratch that uses a storage model to save api hits. It is setup for mountains. 

## Motivation
I was motivated by an extreme desire to learn web development which led me to enroll in this program which ultimately led me to this assignment. 

## Mountains
Should have the following characteristics:
- unique ID (via UUID)
- name
- state
- hiking
- range

## Tech/framework used
Node.JS, Javascript, 
dependencies necessary: 
- ESLint
- Jest
- Faker
- Winston
- superagent
- UUID
- dotenv
- fs-extra
- HTTPie

## Features
Server should run and render mountains. 

## Installation
Clone this repo to your local machine then install the npm dependencies necessary to run this guy. 

## Tests
There are four tests right now.
- POST should respond with a 200 status code for a post request with a valid body
- GET should respond with a 404, not found, for valid requests with an id that was not found
- GET should respond with a 200 status code for a request with a valid id
- POST should respond with a 400 bad request error if no request body was provided or body was invalid

## How to use?
Once you install the dependencies you should be able to run `npm run test` to start the tests which starts the server in your CLI. 


## Contribute
If anyone wants to help, feel free to open a pull request and send it over. PRs will be answered in the order they are received. 

## Credits
Initial codebase created by the Vinincio Vladimir Sanchez Trejo. 
Mad props to anyone who helped me and my parents for birthing me.

#### Anything else that seems useful
```You miss 100% of the shots you don't take. Wayne Gretzky.``` 

-Michael Scott.  

## License
MIT License