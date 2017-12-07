'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/cats', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('POST should respond with 200 status code and a body if no errors', () => {
    return superagent.post('http://localhost:3000/api/cats')
      .set('Content-Type', 'application/json')
      .send({name : 'kitty', says : 'meow'})
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('kitty');
        expect(response.body.says).toEqual('meow');
        expect(response.body.birthday).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });

  test('GET should respond with 200 status code and a body if no errors', () => {
    return superagent.get('http://localhost:3000/api/cats')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('kitty');
      });
  });

});
