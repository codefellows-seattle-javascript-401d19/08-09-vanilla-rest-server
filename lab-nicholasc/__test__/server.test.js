'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with a 200 status code and a body if there is no error', () => {
    return superagent.post('http//localhost:3000/api/notes')
      .set('Content-Type', 'application/json')
      .send({
        title : 'cats',
        content : 'Gregor and the hound',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('cats');
        expect(response.body.content).toEqual('Gregor and the hound');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();



      });
  });
});
