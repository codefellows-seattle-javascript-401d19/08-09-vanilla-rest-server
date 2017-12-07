'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/trials-bikes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  let scorpa = {
    make: 'Scorpa',
    model: 'Twenty',
    displacement: 300,
    color: 'orange',
    year: 2016,
  };

  test('Should respond with a 200 status code and a body if there are no errors.', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json') // TODO: try lowercase c and t if things don't work
      .send(scorpa)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body.make).toEqual('Scorpa');
        expect(res.body.model).toEqual('Twenty');
        expect(res.body.displacement).toEqual(300);
        expect(res.body.color).toEqual('orange');
        expect(res.body.year).toEqual(2016);        
        expect(res.body.id).toBeTruthy();        
        expect(res.body.timestamp).toBeTruthy();        
      });
  });
});