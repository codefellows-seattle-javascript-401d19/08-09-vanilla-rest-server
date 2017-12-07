'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;

describe('/api/books',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('POST should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post(`http://localhost:${PORT}/api/books`)
      .set('Content-Type','application/json')
      .send({
        title : 'Harry Potter',
        author : 'J.K. Rowling',
      })
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.title).toEqual('Harry Potter');
        expect(response.body.author).toEqual('J.K. Rowling');

        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });

  test('POST should respond with a 400 status code if invalid data', () => {
    return superagent.post(`http://localhost:${PORT}/api/books`)
      .set('Content-Type','application/json')
      .send({
        title : '',
        author : 'J.K. Rowling',
      })
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST should respond with a 400 status code if there is an error', () => {
    return superagent.post(`http://localhost:${PORT}/api/books`)
      .set({'Content-Type' : 'application/json'})
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET should respond with 200 status code and a body if there are no errors', () => {
    return superagent.get(`http://localhost:${PORT}/api/books`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0]['title']).toEqual('Harry Potter');
      });
  });
});