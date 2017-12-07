'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with a 200 status code and a body if there is no error', () => {
    return superagent.post('http://localhost:3000/api/notes')
      .set('content-type', 'application/json')
      .send({
        title : 'cats',
        content : 'Gregor and the hound',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        console.log(response.body[0]);
        expect(response.body[0].title).toEqual('cats');
        expect(response.body[0].content).toEqual('Gregor and the hound');
        expect(response.body[0].timestamp).toBeTruthy();
        console.log(response.body[0].id);
        expect(response.body[0].id).toBeTruthy();
      });
  });
  test('should respond with a 200 status code and a note if there is no error', () => {
    return superagent.get('http://localhost:3000/')
      .then(response => {
        expect(response.status).toEqual(200);
        console.log(response.body[0]);
        expect(response.body[0].title).toEqual('cats');
        expect(response.body[0].content).toEqual('Gregor and the hound');
        expect(response.body[0].timestamp).toBeTruthy();
        expect(response.body[0].id).toBeTruthy();
      });
  });
});
