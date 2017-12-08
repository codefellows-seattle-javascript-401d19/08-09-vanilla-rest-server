'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

let tempMountain;
let mountainId;

describe('/api/mountains', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  
  test('POST - should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/mountains')
    .set('Content-Type', 'application/json')
    .send({
      name: 'Mt. Evans',
      location: 'Colorado',
      elevation: '14,235',
    }) // ** .send ** returns a promise
    .then(response => {
      mountainId = response.body.id
      tempMountain = response.body[0]
      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('Mt. Evans');
      expect(response.body.location).toEqual('Colorado');
      expect(response.body.elevation).toEqual('14,235');
      expect(response.body.id).toBeTruthy();

    });
    // .catch(error => {
    //   console.error(error);
    // })
  });

  // test('GET should respond with 200 status code and should contain a response body for a request made without an id', () => {
  //   return superagent.get('http://localhost:3000/api/mountains')
  //     .then(response => {
  //       tempMountain = response.body
  //       expect(response.status).toEqual(200);
  //       expect(tempMountain.name).toEqual('Mt. Evans');
  //       expect(tempMountain.location).toEqual('Colorado');
  //       expect(tempMountain.elevation).toEqual('14,235');
  //       expect(tempMountain.id).toBeTruthy();
  //     });
  // });
  test('GET should respond with 200 status code and should contain a response body for a request made with a valid id', () => {
    return superagent.get(`http://localhost:3000/api/mountains?id=${mountainId}`)
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body[0]).toEqual(tempMountain);
      });
  });

  test('POST should respond with 400 status code and bad request if no request body was provided or the body was invalid', () => {
    return superagent.post('http://localhost:3000/api/mountains')
      .set('Content-Type', 'application/json')
      .then(response => {
        Promise.reject(response)
      })
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  test('DELETE should respond with 204 status code and should not contain a response body for a request made with a valid id', () => {
    return superagent.delete(`http://localhost:3000/api/mountains?id=${mountainId}`)
      .then(response => {
        expect(response.status).toEqual(204);
        expect(response.body).toBe('');
      });
  });

  test('DELETE should respond with 404 status code if no id was sent', () => {
    return superagent.delete('http://localhost:3000/api/mountains')
      .set('Content-Type', 'application/json')
      .then(response => {
          Promise.reject(response)
          console.log(response.status);
      })
      .catch(error => {
        expect(response.status).toEqual(404);
      });
  });
});