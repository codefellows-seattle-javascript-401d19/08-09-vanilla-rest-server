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

  test('POST should respond with 400 status code if the post does not include a beerName', () => {
    return superagent.post('http://localhost:3000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        brewery : 'Rainier Beer',
        beerName : '',
        beerType : 'lager',
      })
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('POST should respond with 400 status code if the post does not include a beerType', () => {
    return superagent.post('http://localhost:3000/api/beers')
      .set('Content-Type', 'application/json')
      .send({
        brewery : 'Rainier Beer',
        beerName : 'Rainier',
        beerType : '',
      })
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET should return a 200 status and and array if no id is passed in', () => {
    return superagent.get('http://localhost:3000/api/beers?id=')
      .then(response => {
        console.log(response.body);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Array);
      });
  });

  test('GET should return a 200 status and a beer associated with a valid id', () => {
    return superagent.get('http://localhost:3000/api/beers?id=918fa210-dbc1-11e7-aba8-572e42a10810')
      .then(response => {
        console.log(response.body);
        expect(response.status).toEqual(200);
        expect(response.body).toBeInstanceOf(Object);
      });
  });

  test('GET should respond with 404 status code if an invalid id is entered', () => {
    return superagent.get('http://localhost:3000/api/beers?id=12345')
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  // EXTRA CREDIT
  // test('DELETE should respond with a 204 status code if a valid id is passed in')

});
