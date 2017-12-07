'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  let idToCheck;

  test('should respond with a 200 status code and a body if there is no error', () => {
    return superagent.post('http://localhost:3000/api/notes')
      .set('content-type', 'application/json')
      .send({
        title : 'food that sounds yummy',
        content : 'eggs and steak',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0].title).toEqual('food that sounds yummy');
        expect(response.body[0].content).toEqual('eggs and steak');
        expect(response.body[0].timestamp).toBeTruthy();
        expect(response.body[0].id).toBeTruthy();
      });
  });
  test('should respond with a 200 status code and a note if there is no error', () => {
    return superagent.get('http://localhost:3000/api/notes')
      .then(response => {
        console.log(response.body[0]);
        expect(response.status).toEqual(200);
        expect(response.body[0].title).toEqual('food that sounds yummy');
        expect(response.body[0].content).toEqual('eggs and steak');
        expect(response.body[0].timestamp).toBeTruthy();
        expect(response.body[0].id).toBeTruthy();
        idToCheck = response.body[0].id;
      });
  });
  test('should respond with a 200 status code and a note if there is no error', () => {
    return superagent.get(`http://localhost:3000/api/notes?id=${idToCheck}`)
      .then(response => {
        console.log(response.body[0]);
        expect(response.status).toEqual(200);
        expect(response.body[0].title).toEqual('food that sounds yummy');
        expect(response.body[0].content).toEqual('eggs and steak');
        expect(response.body[0].timestamp).toBeTruthy();
        expect(response.body[0].id).toEqual(idToCheck);
      });
  });


});
