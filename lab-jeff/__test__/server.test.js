'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/teams',() => {
  beforeAll(server.start);
  afterAll(server.stop);
  //---------------------------------------------------
  //POST tests
  //---------------------------------------------------
  test('POST should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post(`http://localhost:${process.env.PORT}/api/teams`)
      .set('Content-Type', 'application/json')
      .send({
        sport: 'hockey',
        city: 'Detroit',
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
  test('POST should respond with 400 status code if no body is sent', () => {
    return superagent.post(`http://localhost:${process.env.PORT}/api/teams`)
      .set('Content-Type','application/json')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
  test('POST should respond with 400 status code if one of the keys is not sent', () => {
    return superagent.post(`http://localhost:${process.env.PORT}/api/teams`)
      .set('Content-Type', 'application/json')
      .send({
        city : 'Detroit',
        nickname: 'Red Wings',
      })
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });
  //---------------------------------------------------
  //GET tests
  //---------------------------------------------------
  test('GET should respond with 200', () => {
    return superagent.get(`http://localhost:${process.env.PORT}/api/teams`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0].sport).toEqual('hockey');
        expect(response.body[0].city).toEqual('Detroit');
        expect(response.body[0].nickname).toEqual('Red Wings');
        expect(response.body[0].id).toBeTruthy();
      });
  });
  test('GET should respond with 200 and an object when a valid ID is sent', () => {
    return superagent.post(`http://localhost:${process.env.PORT}/api/teams`)
      .set('Content-Type', 'application/json')
      .send({
        sport: 'football',
        city: 'Detroit',
        nickname: 'Lions',
      })
      .then(response => {
        return superagent.get(`http://localhost:${process.env.PORT}/api/teams`)
          .query({id: response.body.id});
      })
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
  test('GET should respond with 404 if it is sent an ID that is not found', () => {
    return superagent.get(`http://localhost:${process.env.PORT}/api/teams`)
      .query({
        id: '1234',
      })
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });
  //---------------------------------------------------
  //DELETE tests
  //---------------------------------------------------
  test('DELETE should respond with 200 if it is sent a valid id', () => {
    return superagent.post(`http://localhost:${process.env.PORT}/api/teams`)
      .set('Content-Type', 'application/json')
      .send({
        sport: 'basketball',
        city: 'Detroit',
        nickname: 'Pistons',
      })
      .then(response => {
        return superagent.delete(`http://localhost:${process.env.PORT}/api/teams`)
          .query({id: response.body.id});
      })
      .then(response => {
        expect(response.status).toEqual(204);
      });
  });

  test('DELETE should respond with 400 if no id is sent', () => {
    return superagent.delete(`http://localhost:${process.env.PORT}/api/teams`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('DELETE should respond with 404 if it is sent an ID that is not found', () => {
    return superagent.delete(`http://localhost:${process.env.PORT}/api/teams`)
      .query({
        id: '1234',
      })
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });
});
