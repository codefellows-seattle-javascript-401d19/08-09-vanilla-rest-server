'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/users', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with a 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/users')
      .set('content-type', 'application/json')
      .send({
        name: 'name',
        description: 'description',
      })
      .then(response => {
        console.log(response.body);
        expect(response.status).toEqual(200);

        expect(response.body.name).toEqual('name');
        expect(response.body.description).toEqual('description');

        expect(response.body).toBeTruthy();
      });
  });
});
