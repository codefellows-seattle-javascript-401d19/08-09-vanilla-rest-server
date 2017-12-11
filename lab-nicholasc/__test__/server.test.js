'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  let idToCheck;

  test('post route should respond with a 200 status code and a body if there is no error', () => {
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
  test('get route /api/notes should respond with a 200 status code and notes if there is no error', () => {
    return superagent.get('http://localhost:3000/api/notes')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0].title).toEqual('food that sounds yummy');
        expect(response.body[0].content).toEqual('eggs and steak');
        expect(response.body[0].timestamp).toBeTruthy();
        expect(response.body[0].id).toBeTruthy();
        idToCheck = response.body[0].id;
      });
  });
  test('get route /api/notes?id should respond with a 200 status code and a note if there is no error', () => {
    return superagent.get(`http://localhost:3000/api/notes?id=${idToCheck}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0].title).toEqual('food that sounds yummy');
        expect(response.body[0].content).toEqual('eggs and steak');
        expect(response.body[0].timestamp).toBeTruthy();
        expect(response.body[0].id).toEqual(idToCheck);
      });
  });
  test('delete should respond with a 200 status code and confirmation if there is no error', () => {
    return superagent.delete(`http://localhost:3000/api/notes?id=${idToCheck}`)
      .then(response => {
        expect(response.status).toEqual(204);
      });
  });
  //---------------------------------------errors
  //superagent is catching these errors
  test('post route should respond with a 400 status code on a bad request', () => {
    return superagent.post('http://localhost:3000/api/notes')
      .set('content-type', 'application/json')
      .send({
        title : '1',
        content : 'a',
      })
      .catch(response => {
        console.log(response.status);
        expect(response.status).toEqual(404);
      });
  });
});
