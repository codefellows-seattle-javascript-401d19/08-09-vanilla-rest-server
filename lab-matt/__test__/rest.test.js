// server.test
'use strict';

const server = require('../server');
const superagent = require('superagent');


describe('/api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('POST should respond with 200 status code and a body if no errors', () => {
    let note = {title: 'my title', content: 'my content'};

    return superagent.post('http://localhost:3000/api/notes')
      .set('Content-Type', 'application/json')
      .send(note)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('my title');
        expect(response.body.content).toEqual('my content');
      })
      .catch(error => {
        expect(error).toEqual('anything because this shouldn\'t be tested');        
      });
  });

  test('POST should respond with 400 status code if there is an error', () => {
    let note = {title: 'my title'};

    return superagent.post('http://localhost:3000/api/notes')
      .set('Content-Type', 'application/json')
      .send(note)
      .then(response => {
        console.log('this should not show', response);
      })
      .catch(error => {
        expect(error.status).toEqual(400);
      });
  });

  test('should respond with 200 status code and a body if no errors', () => {
    let note = {title: 'my title', content: 'my content'};

    return superagent.get('http://localhost:3000/api/notes')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toEqual({});
      });
  });
});
