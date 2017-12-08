'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

// data for testing
const testUserData = { name: 'name', description: 'description' };

describe('/api/users', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('GET requests', () => {
    test('GET should respond with a 200 status code and an array all resources', () => {
      const url = 'http://localhost:3000/api/users';

      // POST request for mock data
      return superagent.post(url)
        .set('content-type', 'application/json')
        .send(testUserData)
        .then(() => {
          return superagent.post(url)
            .set('content-type', 'application/json')
            .send(testUserData)
            .then(() => {
              return superagent.get(url)
                .set('content-type', 'application/json')
                .then(response => {
                  expect(response.status).toEqual(200);
                  expect(response.body[0].name).toEqual(testUserData.name);
                  expect(response.body[0].description).toEqual(testUserData.description);
                  expect(response.body[1].name).toEqual(testUserData.name);
                  expect(response.body[1].description).toEqual(testUserData.description);
                });
            });
        });
    });

    test('GET should respond with a 200 status code an a single resource determined by uuid', () => {
      const url = 'http://localhost:3000/api/users';

      // POST request for mock data
      return superagent.post(url)
        .set('content-type', 'application/json')
        .send(testUserData)
        .then(response => {
          const querystring = response.body.testId;
          return superagent.get(url)
            .set('content-type', 'application/json')
            .query({ id: `${querystring}` })
            .then(response => {
              expect(response.status).toEqual(200);
              expect(response.body.name).toEqual(testUserData.name);
              expect(response.body.description).toEqual(testUserData.description);
              expect(response.req.path).toEqual(`/api/users?id=${querystring}`);
            });
        });
    });

    test('GET should respond with a 404 if pathname requested is invalid', () => {
      const url = 'http://localhost:3000/invalid/pathname';
      return superagent.get(url)
        .set('content-type', 'application/json')
        .then(response => Promise.reject(response))
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });

    test('GET should respond with a 404 if id is not found', () => {
      const url = 'http://localhost:3000/api/users?id=notexisting';
      return superagent.get(url)
        .set('content-type', 'application/json')
        .then(response => Promise.reject(response))
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });

  describe('POST requests', () => {
    test('POST should respond with a 200 status code and a body if there are no errors', () => {
      const url = 'http://localhost:3000/api/users';
      return superagent.post(url)
        .set('content-type', 'application/json')
        .send(testUserData)
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body.name).toEqual('name');
          expect(response.body.description).toEqual('description');
        });
    });

    test('POST should respond with a 400 if there is any error in data being passed', () => {
      const url = 'http://localhost:3000/api/users';
      const invalidJSON = '{';
      return superagent.post(url)
        .set('content-type', 'application/json')
        .send(invalidJSON)
        .then(response => Promise.reject(response))
        .catch(response => {
          expect(response.status).toEqual(400);
        });
    });
  });

  describe('DELETE requests', () => {
    test('DELETE should respond with a 204 status code and have the specified user removed', () => {
      const url = 'http://localhost:3000/api/users';

      // POST requests for mock data
      return superagent.post(url)
        .set('content-type', 'application/json')
        .send(testUserData)
        .then(response => {
          const querystring = response.body.testId;
          return superagent.delete(url)
            .set('content-type', 'application/json')
            .query({ id: `${querystring}` })
            .then(response => {
              expect(response.status).toEqual(204);
              expect(response.body).toEqual({});
              expect(response.req.path).toEqual(`/api/users?id=${querystring}`);
            });
        });
    });

    test('DELETE should respond with a 400 if id does not exist', () => {
      const url = 'http://localhost:3000/api/users?id=notexisting';

      // POST requests for mock data
      return superagent.post(url)
        .set('content-type', 'application/json')
        .send(testUserData)
        .then(() => {
          return superagent.delete(url)
            .set('content-type', 'application/json')
            .then(response => Promise.reject(response))
            .catch(response => {
              expect(response.status).toEqual(400);
            });
        });
    });

    test('DELETE should respond with a 400 if no id is provided', () => {
      const url = 'http://localhost:3000/api/users';
      return superagent.delete(url)
        .set('content-type', 'application/json')
        .then(response => Promise.reject(response))
        .catch(response => {
          expect(response.status).toEqual(404);
        });
    });
  });
});
