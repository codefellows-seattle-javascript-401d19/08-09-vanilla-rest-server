'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/wizards',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/wizards')
      .set('Content-Type','application/json')
      .send({
        name : 'Dalton',
        origin : 'Askaban',
      })//send returns a promise.
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.name).toEqual('Dalton');
        expect(response.body.origin).toEqual('Askaban');

        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
});