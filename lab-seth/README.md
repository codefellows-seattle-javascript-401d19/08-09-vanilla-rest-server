# Vanilla HTTP Server

This is a simple HTTP server that allows users to input a url to make a cow say something!

## Motivation

FUN! and Classwork :)

## Build status

<!-- Build status of continus integration i.e. travis, appveyor etc. Ex.  -->
Status: Working


## Code style

js-standard-style

<!-- ## Screenshots

![Chat Room Example](https://raw.githubusercontent.com/SethDonohue/06-tcp-server/seth-lab/lab-seth/img/TCP-Chat-Server.png) -->

## Tech/framework used
- Eslint
- Node
- jest
- superagent
- dotenv
- Winston
- Faker
- Cowsay
- Javascript /ES6


#### Built with

VScode

## Features

It uses Winston Logger to keep track of logs.

## Code Example
```
    requestParser.parse(request)
    .then(request => {
      if(request.method === 'GET' && request.url.pathname === '/'){
        response.writeHead(200,{ 'Content-Type' : 'text/html' });

        response.write(`<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>  
            </head>
            <body>
            <header>
              <nav>
                <ul> 
                  <li><a href="/cowsay">cowsay</a></li>
                </ul>
              </nav>
            <header>
            <main>
              <!-- project description -->
            </main>
            </body>
          </html>`);
        logger.log('info','Responding with a 200 status code');
        response.end();
        return;

      } else if (request.method === 'GET' && request.url.pathname === '/cowsay') {
        response.writeHead(200, { 'Content-Type': 'text/html' });

        logger.log('info', `Original URL: ${JSON.stringify(request.url)}`);
        let message = cowsay.think({ text: 'I need something good to say!' });

        if(request.url.query.text) message = cowsay.think({text : request.url.query.text});          

        response.write(`<!DOCTYPE html>
          <html>
            <head>
              <title> cowsay </title>  
            </head>
            <body>
              <h1> cowsay </h1>
              <pre>${message}</pre>
            </body>
          </html>`);
        logger.log('info', 'Responding with a 200 status code');
        response.end();
        return;

      } else if (request.method === 'POST' && request.url.pathname === '/api/cowsay'){
        response.writeHead(200,{ 'Content-Type' : 'application/json' });
        response.write(JSON.stringify(request.body));
        response.end();
        return;
      }
      response.writeHead(404,{ 'Content-Type' : 'text/plain' });
      response.write('Not Found');
      logger.log('info','Responding with a 404 status code');
      response.end(); 
      return;
    }).catch(error => {
      logger.log('info','Answering with a 400 status code');
      logger.log('info',error);
      let errorMessage = null;

      if (request.method === 'POST' && request.body === undefined) {
        errorMessage = `{ "error": "invalidrequest: body required" }`;

      } else if (request.method === 'POST' && request.body.text === undefined) {
        errorMessage = `{ "error": "invalidrequest: text query required" }`;

      } else {
        errorMessage = 'Bad Request';
      }
      response.writeHead(400,{ 'Content-Type' : 'application/json' });
      response.write(errorMessage);
      response.end();
      return;
    });
```

## Installation
1. ) Get source code from github (https://github.com/SethDonohue/07-http-server/tree/seth-lab-7)
2. ) In terminal navigate to 'lab-seth' folder and run following commands:
```
npm init -y
npm install
npm install -D jest eslint 
npm install -s winston 
npm install -s dotenv
```

<!-- Provide step by step series of examples and explanations about how to get a development env running. -->

## API Reference

Docs in Progress

## Tests

- Confirms a 200 status code on a proper POST request
- Confirms a 400 status code when an improper POST request is made

#### To Run Tests, run these commands in terminal from lab-seth folder

1. ) npm start
2. ) npm test

## How to use?

1. ) In terminal navigate to lab-seth folder
2. ) In terminal run 'npm start' to execute server startup script
3. ) In your browser navigate to localhost:3000/cowsay?text=<your message here>
  - <your message here> should contain anything you want the cow to say! Be sure to exclude the <>
  - example url: 
  ```localhost:3000/cowsay?text=mooooooooo```

<!-- If people like your project they’ll want to learn how they can use it. To do so include step by step guide to use your project. -->

## Contribute

<!-- Let people know how they can contribute into your project. A contributing guideline will be a big plus. -->

## Credits

- Winston
- Node
- dotenv
- Classmates that helped me!
<!-- Give proper credits. This could be a link to any repo which inspired you to build this project, any blogposts or links to people who contrbuted in this project.

Anything else that seems useful -->

## License

#### MIT © Seth Donohue