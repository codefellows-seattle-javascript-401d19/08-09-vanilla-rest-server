'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;

describe('/api/heroes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('POST should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/heroes')
      .set('Content-Type', 'application/json')
      .send({
        name : 'Kain',
        superPower : 'Immortality',
      })
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.name).toEqual('Kain');
        expect(response.body.superPower).toEqual('Immortality');

        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });

  test('POST should respond with 400 status code if no request body was provided or the body was invalid', () => {
    return superagent.post('http://localhost:3000/api/heroes')
      .set('Content-Type', 'application/json')
      .send({
        name : 'Kain',
      })
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET should contain a response body for a request made with a valid id', () => {
    return superagent.post('http://localhost:3000/api/heroes')
      .set('Content-Type', 'application/json')
      .send({
        name : 'Kain',
        superPower : 'Immortality',
      })
      .then(response => {
        return superagent.get(`http://localhost:${PORT}/api/heroes`)
          .query({id: response.body.id});
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('Kain');
        expect(response.body.superPower).toEqual('Immortality');
      });
  });


  test('GET should respond with 404 status code if no request body was provided or the body was invalid', () => {
    return superagent(`http://localhost:${PORT}/api/heroes?id=testing`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE should return 204 status code remove test added hero from database for a request made with a valid hero id', () => {
    return superagent.post('http://localhost:3000/api/heroes')
      .set('Content-Type', 'application/json')
      .send({
        name : 'Kain',
        superPower : 'Immortality',
      })
      .then(response => {
        return superagent.delete(`http://localhost:${PORT}/api/heroes?`)
          .query({id: response.body.id});
      })
      .then(response => {
        expect(response.status).toEqual(204);
      });
  });

  test('DELETE should respond with 400 status code if no request was made with invalid id', () => {
    return superagent.delete(`http://localhost:${PORT}/api/heroes?`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

});
