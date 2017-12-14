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

  test('GET should respond with 200 status code and a body if there are no errors and no id', () => {
    return superagent.get(`http://localhost:${PORT}/api/wizards`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0]['name']).toEqual('Harry Potter');
      });
  });

  test('GET should respond with 200 status code and a specific wizard if there are no errors and an id provided', () => {
    return superagent.get(`http://localhost:${PORT}/api/wizards?id=${wizardId}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body['name']).toEqual('Harry Potter');
      });
  });

  test('GET should respond with 404 not found status code for valid requests made with an id that was not found', () => {
    return superagent.get(`http://localhost:${PORT}/api/wizards?id=invalid`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE should respond with 204 status code with no content in the body if successfully deleted', () => {
    return superagent.del(`http://localhost:${PORT}/api/wizards?id=${wizardId}`)
      .then(response => {
        expect(response.status).toEqual(204);
      });
  });

  test('DELETE should respond with 400 status code if id is not provided', () => {
    return superagent.del(`http://localhost:${PORT}/api/wizards`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
});


});