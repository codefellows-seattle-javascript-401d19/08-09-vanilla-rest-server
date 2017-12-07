'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('api/mountains',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test(`should respond with a 200 status code and a body if there are no errors`, () => {
    return superagent.post(`http://localhost:3000/api/mountains`)
      .set('Content-Type','application/json')
      .send({
        name : 'Shuksan',
        state : 'Washington',
        hiking : 'Yes',
        range : 'Cascades',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.id).toBeTruthy();
        
        expect(response.body.name).toEqual('Shuksan');
        expect(response.body.state).toEqual('Washington');
        expect(response.body.hiking).toEqual('Yes');
        expect(response.body.range).toEqual('Cascades');
      });
  });
});