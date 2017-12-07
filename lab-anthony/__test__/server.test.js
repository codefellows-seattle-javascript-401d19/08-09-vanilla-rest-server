'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/beers', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        title : 'Rainier',
        content : 'Beer',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('Rainier');
        expect(response.body.content).toEqual('Beer');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
});
