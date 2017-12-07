'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/heroes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/heroes')
      .set('Content-Type', 'application/json')
      .send({
        name : 'Kain',
        superPower : 'Immortality',
      })
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.name).toEqual('Kain');
        expect(response.body.superPower).toEqual('Immortality');

        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
});
