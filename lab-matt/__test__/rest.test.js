// server.test
'use strict';

const server = require('../server');
const superagent = require('superagent');

// api: convention for database | notes / 'Model' + 's'
describe('/api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  test('should respond with 200 status code and a body if no errors', () => {
    let note = {title: 'my title', content: 'my content'};

    return superagent.post('http://localhost:3000/api/notes')
      .set('Content-Type', 'application/json')
      // mattL - '.send' returns a promise so that '.then' can use that promise
      .send(note)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('my title');
        expect(response.body.content).toEqual('my content');
      });
  });
});
