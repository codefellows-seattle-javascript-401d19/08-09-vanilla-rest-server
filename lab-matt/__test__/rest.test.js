// server.test
'use strict';

const server = require('../server');
const superagent = require('superagent');


describe('/api/dogs', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  let id;

  test('POST should respond with 200 status code and a body if no errors', () => {
    let dog = {legs: 4, isPoodle: true};

    return superagent.post('http://localhost:3000/api/dogs')
      .set('Content-Type', 'application/json')
      .send(dog)
      .then(response => {
        id = response.body.id;
        expect(response.status).toEqual(200);
        expect(response.body.legs).toEqual(4);
        expect(response.body.isPoodle).toEqual(true);
      })
      .catch(error => {
        expect(error).toEqual('anything because this shouldn\'t be tested');        
      });
  });

  test('POST should respond with 400 status code if there is an error', () => {
    let dog = {legs: '4'};

    return superagent.post('http://localhost:3000/api/dogs')
      .set('Content-Type', 'application/json')
      .send(dog)
      .then(response => {
        console.log('this should not show', response);
      })
      .catch(error => {
        expect(error.status).toEqual(400);
      });
  });

  test('GET should respond with 200 status code and an array of dogs if no id input', () => {
    return superagent.get('http://localhost:3000/api/dogs')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toEqual({});
        expect(response.body[0].id).toEqual(id);      
      });
  });

  test('GET should respond with 200 status code and dog with the matching id', () => {
    return superagent.get(`http://localhost:3000/api/dogs?id=${id}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toEqual({});
        expect(response.body.id).toEqual(id);      
      });
  });

  test('GET should return 400 status code if the id does not match', () => {
    return superagent.get(`http://localhost:3000/api/dogs?id=1234`)
      .then(response => {
        console.log('this should not show', response);
      })
      .catch(error => {
        expect(error.status).toEqual(400);
      });
  });
});
