'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/cats', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/cats')
      .set('Content-Type', 'application/json')
      .send({
        title : 'cats',
        content : 'meow',
      })
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.title).toEqual('cats');
        expect(response.body.content).toEqual('meow');

        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
});
