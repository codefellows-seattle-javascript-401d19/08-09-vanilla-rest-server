// server.test
'use strict';

const server = require('../server');
const superagent = require('superagent');
const PORT = process.env.PORT;

describe('/api/dogs', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  let id;

  test('POST should respond with 200 status code and a body if no errors', () => {
    let dog = {legs: 4, isPoodle: true};

    return superagent.post(`http://localhost:${PORT}/api/dogs`)
      .set('Content-Type', 'application/json')
      .send(dog)
      .then(response => {
        id = response.body.id;
        expect(response.status).toEqual(200);
        expect(response.body.legs).toEqual(4);
        expect(response.body.isPoodle).toEqual(true);
        expect(response.body.id).toBeTruthy();
      })
      .catch(error => {
        expect(error).toEqual('anything because this shouldn\'t be tested');        
      });
  });

  test('POST should respond with 400 status code if there is an error', () => {
    let dog = {legs: '4'};

    return superagent.post(`http://localhost:${PORT}/api/dogs`)
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
    return superagent.get(`http://localhost:${PORT}/api/dogs`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(typeof(response.body)).toBe(typeof(['an', 'array']));
        expect(response.body[0].id).not.toBeNull();      
      });
  });

  test('GET should respond with 200 status code and dog with the matching id', () => {
    return superagent.get(`http://localhost:${PORT}/api/dogs?id=${id}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body).not.toEqual({});
        expect(response.body.id).toEqual(id);      
      });
  });

  test('GET should return 404 status code if the id does not match', () => {
    return superagent.get(`http://localhost:${PORT}/api/dogs?id=1234`)
      .then(response => {
        console.log('this should not show', response.status);
      })
      .catch(error => {
        expect(error.response.error.path).toEqual('/api/dogs?id=1234');
        expect(error.status).toEqual(404);
      });
  });

  test('DELETE should return 204 status code if there is an object with the given id', () => {
    return superagent.delete(`http://localhost:${PORT}/api/dogs?id=${id}`)
      .then(response => {
        
        expect(id).toEqual(response.req.path.match(/\?id=(.+)/)[1]);
        expect(response.status).toEqual(204);
        expect(response.body).toEqual({});
      });
  });

  test('DELETE should return 400 status code if there is no id given', () => {
    return superagent.delete(`http://localhost:${PORT}/api/dogs`)
      .then(response => {
        console.log('this should not show', response);
      })
      .catch(error => {
        expect(error.status).toEqual(400);
      });
  });

  test('DELETE should return 404 status code if there is no dog matching id', () => {
    return superagent.delete(`http://localhost:${PORT}/api/dogs?id=1234`)
      .then(response => {
        console.log('this should not show', response);
      })
      .catch(error => {
        expect(error.status).toEqual(404);
      });
  });
});