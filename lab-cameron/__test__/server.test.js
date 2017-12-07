'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/users', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  describe('GET requests', () => {
    test('GET should respond with a 200 status code and an array all resources', () => {
      const url = 'http://localhost:3000/api/users';
      return superagent.get(url)
        .set('content-type', 'application/json')
        .then(response => {
          expect(response.body[0].name).toBe('test_name_1');
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
