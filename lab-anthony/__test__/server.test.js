'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;

describe('/api/beers', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post(`http://localhost:${PORT}/api/beers`)
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
});
