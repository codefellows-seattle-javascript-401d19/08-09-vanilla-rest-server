'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

//----------------------------------
require('dotenv').config();
const PORT = process.env.PORT;
const headUrl = `http://localhost:${PORT}/api`;
//----------------------------------


describe('api/notes', () => {
  beforeAll(server.start);
  afterAll(server.stop);
  let idToCheck;

  test('post route should respond with a 200 status code and a body if there is no error', () => {
    return superagent.post(`${headUrl}/notes`)
      .set('content-type', 'application/json')
      .send({
        title : 'food that sounds yummy',
        content : 'eggs and steak',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('food that sounds yummy');
        expect(response.body.content).toEqual('eggs and steak');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
  test('get route /api/notes should respond with a 200 status code and notes if there is no error', () => {
    return superagent.get(`${headUrl}/notes`)
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
    return superagent.get(`${headUrl}/notes?id=${idToCheck}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.title).toEqual('food that sounds yummy');
        expect(response.body.content).toEqual('eggs and steak');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toEqual(idToCheck);
      });
  });
  test('delete should respond with a 200 status code and confirmation if there is no error', () => {
    return superagent.delete(`${headUrl}/notes?id=${idToCheck}`)
      .then(response => {
        expect(response.status).toEqual(204);
      });
  });
  //--------------------------------------------
  //errors
  // superagent is catching these errors
  test('post route should respond with a 400 status code on a bad request', () => {
    return superagent.post(`${headUrl}/notes`)
      .set('content-type', 'application/json')
      .send()
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
  test('get route /api/notes should respond with a 400 status code if there is a bad route', () => {
    return superagent.get(`${headUrl}/badroute`)
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
  test('get route /api/notes?id should respond with a 500 status code if there is a bad id', () => {
    return superagent.get(`${headUrl}/notes?id=badid`)
      .catch(response => {
        expect(response.status).toEqual(500);
      });
  });
  test('delete should respond with a 400 status code if there is an error', () => {
    return superagent.delete(`${headUrl}/badroute?id=${idToCheck}`)
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
  test('delete should respond with a 500 status code if there is abad id', () => {
    return superagent.delete(`${headUrl}/notes?id=badid`)
      .catch(response => {
        expect(response.status).toEqual(500);
      });
  });
});
