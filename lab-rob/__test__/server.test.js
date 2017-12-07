'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/trials-bikes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  let testId;
  let scorpa = {
    make: 'Scorpa',
    model: 'Twenty',
    displacement: 300,
    color: 'orange',
    year: 2016,
  };

  test('Should respond with a 200 status code and a body if there are no errors.', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .send(scorpa)
      .then(res => {
        testId = res.body.id;
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

  test('Should respond with a 400 status code if no/invalid body.', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .then(res => {
        Promise.reject(res);      
      })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text)).toEqual({error: 'bad request, no object sent.'});
      });
  });
});