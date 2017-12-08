'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;
let bookId;

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
        bookId = response.body.id;
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

  test('GET should respond with 200 status code and a body if there are no errors and no id', () => {
    return superagent.get(`http://localhost:${PORT}/api/books`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0]['title']).toEqual('Harry Potter');
      });
  });

  test('GET should respond with 200 status code and a specific book if there are no errors and an id provided', () => {
    return superagent.get(`http://localhost:${PORT}/api/books?id=${bookId}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body['title']).toEqual('Harry Potter');
      });
  });

  test('GET should respond with 404 not found status code for valid requests made with an id that was not found', () => {
    return superagent.get(`http://localhost:${PORT}/api/books?id=invalid`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE should respond with 204 status code with no content in the body if successfully deleted', () => {
    return superagent.del(`http://localhost:${PORT}/api/books?id=${bookId}`)
      .then(response => {
        expect(response.status).toEqual(204);
      });
  });

  test('DELETE should respond with 400 status code if id is not provided', () => {
    return superagent.del(`http://localhost:${PORT}/api/books`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
});