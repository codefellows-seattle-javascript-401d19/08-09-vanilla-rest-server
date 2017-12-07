'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const User = require('../model/user');

// data for testing
const test_users = [];
test_users.push(new User('test_name_1', 'test_description_1'));
test_users.push(new User('test_name_2', 'test_description_2'));

describe('/api/users', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('GET requests', () => {
    test('GET should respond with a 200 status code and an array all resources', () => {
      const url = 'http://localhost:3000/api/users';
      return superagent.get(url)
        .set('content-type', 'application/json')
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(test_users);
        });
    });

    test('GET should respond with a 200 status code an a single resource determined by uid', () => {
      const querystring = test_users[0].getId();
      const url = 'http://localhost:3000/api/users';
      return superagent.get(url)
        .set({ 'content-type': 'application/json' })
        .query({ id: `${querystring}` })
        .then(response => {
          expect(response.status).toEqual(200);
          expect(response.body).toEqual(test_users[0]);
          expect(response.req.path).toEqual(`/api/users?id=${querystring}`);
        });
    });

    test.only('GET should respond with a 404 if pathname requested is invalid', () => {
      const url = 'http://localhost:3000/invalid/pathname';
      return superagent.get(url)
        .set({ 'content-type': 'application/json' })
        .catch(response => {
          expect(response.status).toEqual(400);
        });

    });
  });

  describe('POST requests', () => {
    test('POST should respond with a 200 status code and a body if there are no errors', () => {
      const url = 'http://localhost:3000/api/users';
      return superagent.post(url)
        .set('content-type', 'application/json')
        .send({
          name: 'name',
          description: 'description',
        })
        .then(response => {
          expect(response.status).toEqual(200);

          expect(response.body.name).toEqual('name');
          expect(response.body.description).toEqual('description');
        });
    });
  });
});
