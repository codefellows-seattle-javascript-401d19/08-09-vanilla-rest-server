'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('api/mountains',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test(`should respond with a 404, not found, for valid requests with an id that was not found`, () => {
    return superagent.get(`http://localhost:3000/api/mountains`)
      .set('Content-Type','application/json')
      .send({
        id : 'null',
      })
      .then(response => {
        expect(response.status).toEqual(404);
      });
  });

  test(`should respond with a 200 status code for a request with a valid id`, () => {
    return superagent.get(`http://localhost:3000/api/mountains`)
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

  test(`should respond with a 400 bad request error if no request body was provided or body was invalid`, () => {
    return superagent.post(`http://localhost:3000/api/mountains`)
      .set('Content-Type','application/json')
      .send({
        fakeName : 'fakeShuksan',
      })
      .then(response => {
        expect(response.status).toEqual(400);
      });
  });

  test(`should respond with a 200 status code for a post request with a valid body`, () => {
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