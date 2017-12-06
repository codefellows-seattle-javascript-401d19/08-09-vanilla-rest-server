'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/teams',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/teams')
      .set('Content-Type','application/json')
      .send({
        sport : 'hockey',
        city : 'Detroit',
        nickname: 'Red Wings',
      })
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.sport).toEqual('hockey');
        expect(response.body.city).toEqual('Detroit');
        expect(response.body.nickname).toEqual('Red Wings');
        expect(response.body.id).toBeTruthy();
      });
  });
});
