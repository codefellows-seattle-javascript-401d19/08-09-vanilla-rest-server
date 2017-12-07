'use strict';

const server = require('../lib/server');
const superagent = require('superagent');
const PORT = process.env.PORT;

let catID;

describe('/api/cats', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('POST should respond with 200 status code and a body if no errors', () => {
    return superagent.post(`http://localhost:${PORT}/api/cats`)
      .set('Content-Type', 'application/json')
      .send({name : 'kitty', says : 'meow'})
      .then(response => {
        catID = response.body.id;
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('kitty');
        expect(response.body.says).toEqual('meow');
        expect(response.body.birthday).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });

  test('POST should respond with 400 if no body or invalid body request', () => {
    return superagent.post(`http://localhost:${PORT}/api/cats`)
      .set('Content-Type', 'application/json')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('GET should respond with 200 status code and a body if no errors', () => {
    return superagent.get(`http://localhost:${PORT}/api/cats`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0].name).toEqual('kitty');
      });
  });

  test('GET should respond with 200 if legitimate request with id is passed', () => {
    return superagent.get(`http://localhost:${PORT}/api/cats?id=${catID}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('kitty');
      });
  });

  test('GET should respond with 404 if id does not exist', () => {
    return superagent.get(`http://localhost:${PORT}/api/cats?id=wrong`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE should respond with a 400 message if no id provided', () => {
    return superagent.del(`http://localhost:${PORT}/api/cats`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('DELETE should respond with a 400 message if invalid id provided', () => {
    return superagent.del(`http://localhost:${PORT}/api/cats?id=wrong`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });

  test('DELETE should respond with a 200 message if successful', () => {
    return superagent.del(`http://localhost:${PORT}/api/cats?id=${catID}`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });

});
