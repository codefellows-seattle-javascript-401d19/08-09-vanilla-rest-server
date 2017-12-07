'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
require('dotenv').config();

const PORT = process.env.PORT;

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

  test('POST should respond with a 200 status code and a body if there are no errors.', () => {
    return superagent.post(`http://localhost:${PORT}/api/trials-bikes`)
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

  test('POST should respond with a 400 status code if no/invalid body, and an object with an error property.', () => {
    return superagent.post(`http://localhost:${PORT}/api/trials-bikes`)
      .set('Content-Type', 'application/json')
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, no object sent.');
      });
  });

  test('POST should respond with a 400 status code if body has no make property, and an object with an error property.', () => {
    return superagent.post(`http://localhost:${PORT}/api/trials-bikes`)
      .set('Content-Type', 'application/json')
      .send({})
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, request property "make" must be of type string. You supplied type: undefined');
      });
  });

  test('POST should respond with a 400 status code if body has no/invalid model property, and an object with an error property.', () => {
    return superagent.post(`http://localhost:${PORT}/api/trials-bikes`)
      .set('Content-Type', 'application/json')
      .send({make: '', model: undefined})
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, request property "model" must be of type string. You supplied type: undefined');
      });
  });

  test('POST should respond with a 400 status code if body has no/invalid year property, and an object with an error property.', () => {
    return superagent.post(`http://localhost:${PORT}/api/trials-bikes`)
      .set('Content-Type', 'application/json')
      .send({make: '', model: '', year: true})
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, request property "year" must be of type number. You supplied type: boolean');
      });
  });

  test('POST should respond with a 400 status code if body has no/invalid displacement property, and an error object with error an property.', () => {
    return superagent.post(`http://localhost:${PORT}/api/trials-bikes`)
      .set('Content-Type', 'application/json')
      .send({ make: '', model: '', year: 3, displacement: null })
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, request property "displacement" must be of type number. You supplied type: object');
      });
  });

  test('POST should respond with a 400 status code if body has no/invalid color property, and an object with an error property."', () => {
    return superagent.post(`http://localhost:${PORT}/api/trials-bikes`)
      .set('Content-Type', 'application/json')
      .send({make: '', model: '', year: 3, displacement: 4, color: 9})
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, request property "color" must be of type string. You supplied type: number');
      });
  });

  test('GET should respond with a 200 status code and an array of all objects if no id is given.', () => {
    return superagent.get(`http://localhost:${PORT}/api/trials-bikes`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(testArray);
      });
  });

  test('GET should respond with a 200 status code and a single object when id is given.', () => {
    return superagent.get(`http://localhost:${PORT}/api/trials-bikes?id=${testId}`)
      .then(res => {
        expect(res.status).toEqual(200);
        expect(res.body).toEqual(testArray[0]);
      });
  });

  test('GET should respond with a 404 status code and an object with error property "No bike with id "<id>".', () => {
    return superagent.get(`http://localhost:${PORT}/api/trials-bikes?id=hamburger`)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.response.res.text).error).toEqual('No bike with id "hamburger".');
      });
  });

  test('DELETE should respond with a 204 status code and an empty body if the id is valid.', () => {
    return superagent.delete(`http://localhost:${PORT}/api/trials-bikes?id=${testId}`)
      .then(res => {
        expect(res.status).toEqual(204);
        expect(res.body).toEqual({});
      });
  });
  
  test('DELETE should respond with a 400 status code if no id is given.', () => {
    return superagent.delete(`http://localhost:${PORT}/api/trials-bikes`)
      .catch(res => {
        expect(res.status).toEqual(400);
        expect(JSON.parse(res.response.res.text).error).toEqual('bad request, no id.');
      });
  });
  
  test('DELETE should respond with a 404 status code if no bike with the given id is on the server.', () => {
    return superagent.delete(`http://localhost:${PORT}/api/trials-bikes?id=hotdogs`)
      .catch(res => {
        expect(res.status).toEqual(404);
        expect(JSON.parse(res.response.res.text).error).toEqual('No bike with id "hotdogs".');
      });
  });
});