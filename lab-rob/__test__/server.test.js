'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/trials-bikes', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  let testId, testArray;
  let scorpa = {
    make: 'Scorpa',
    model: 'Twenty',
    displacement: 300,
    color: 'orange',
    year: 2016,
  };


  test('Post should respond with a 200 status code and a body if there are no errors.', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .send(scorpa)
      .then(res => {
        testId = res.body.id;
        testArray = [res.body];
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

  test('Post should respond with a 400 status code if no/invalid body, and an object with error property "bad request, no object sent."', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .then(res => {
        Promise.reject(res);      
      })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, no object sent.');
      });
  });

  test('Post should respond with a 400 status code if body has no make property, and an object with error property "bad request, make not found!"', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .send({})
      .then(res => {
        Promise.reject(res);      
      })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, make not found!');
      });
  });

  test('Post should respond with a 400 status code if body has no model property, and an object with error property "bad request, model not found!"', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .send({make: 1})
      .then(res => {
        Promise.reject(res);      
      })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, model not found!');
      });
  });

  test('Post should respond with a 400 status code if body has no year property, and an object with error property "bad request, year not found!"', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .send({make: 1, model: 2})
      .then(res => {
        Promise.reject(res);      
      })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, year not found!');
      });
  });

  test('Post should respond with a 400 status code if body has no displacement property, and an object with error property "bad request, displacement not found!"', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .send({make: 1, model: 2, year: 3})
      .then(res => {
        Promise.reject(res);      
      })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, displacement not found!');
      });
  });

  test('Post should respond with a 400 status code if body has no color property, and an object with error property "bad request, color not found!"', () => {
    return superagent.post('http://localhost:3000/api/trials-bikes')
      .set('Content-Type', 'application/json')
      .send({make: 1, model: 2, year: 3, displacement: 4})
      .then(res => {
        Promise.reject(res);      
      })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, color not found!');
      });
  });

  test('Get should respond with a 200 status code and an array of all objects if no id is given.', () => {
    return superagent.get('http://localhost:3000/api/trials-bikes')
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(testArray);
      });
  });

  test('Get should respond with a 200 status code and a single object when id is given.', () => {
    return superagent.get(`http://localhost:3000/api/trials-bikes?id=${testId}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(testArray[0]);
      });
  });
});