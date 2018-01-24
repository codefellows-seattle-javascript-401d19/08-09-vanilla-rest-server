'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/beers', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('POST should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        brewery : 'Rainier Beer',
        beerName : 'Rainier',
        beerType : 'lager',
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.brewery).toEqual('Rainier Beer');
        expect(response.body.beerName).toEqual('Rainier');
        expect(response.body.beerType).toEqual('lager');
        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });

  test('POST should respond with 400 status code if the post does not include a brewery', () => {
    return superagent.post('http://localhost:3000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        brewery : '',
        beerName : 'Rainier',
        beerType : 'lager',
      })
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET should respond with 200 status code and an array of beer objects', () => {
    return superagent.get('http://localhost:3000/api/beers')
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });

  test('GET should respond with 200 status code when a valid id is requested', () => {
    return superagent.post('http://localhost:3000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        brewery : 'Lagunitas',
        beerName : 'daytime ale',
        beerType : 'session ale',
      })
      .then(response => {
        return superagent.get('http://localhost:3000/api/beers').query({id: response.body.id});
      })
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });

  test('GET should respond with 404 status code when an invalid id is passed in', () => {
    return superagent.get('http://localhost:3000/api/beers').query({id: '12312313'})
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE should respond with 200 status code and an array of beer objects', () => {
    return superagent.post('http://localhost:3000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        brewery : 'Lagunitas',
        beerName : 'daytime ale',
        beerType : 'session ale',
      })
      .then(response => {
        return superagent.delete('http://localhost:3000/api/beers').query({id: response.body.id});
      })
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
});
