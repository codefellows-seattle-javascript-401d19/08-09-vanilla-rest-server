'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

let tempMountain;

describe('/api/mountains', () => {
  beforeAll(server.start);
  afterAll(server.stop);

  
  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/mountains')
    .set('Content-Type', 'application/json')
    .send({
      name: 'Mt. Evans',
      location: 'Colorado',
      elevation: '14,235'
    }) // ** .send ** returns a promise
    .then(response => {
      console.log(response.body.id);
      expect(response.status).toEqual(200);
      expect(response.body.name).toEqual('Mt. Evans');
      expect(response.body.location).toEqual('Colorado');
      expect(response.body.elevation).toEqual('14,235');
      expect(response.body.id).toBeTruthy();
    });
  });

  test('should respond with 200 status code and should contain a response body for a request made without an id', () => {
    return superagent.get('http://localhost:3000/api/mountains')
      .then(response => {
        tempMountain = response.body[0]
        expect(response.status).toEqual(200);
        expect(tempMountain.name).toEqual('Mt. Evans');
        expect(tempMountain.location).toEqual('Colorado');
        expect(tempMountain.elevation).toEqual('14,235');
        expect(tempMountain.id).toBeTruthy();
      });
  });

  test('should respond with 200 status code and should contain a response body for a request made with a valid id', () => {
    return superagent.get('http://localhost:3000/api/mountains?id=${mountainId}')
      .then(response => {
        tempMountain = response.body[0]
        let mountainId = response.body[0].id
        console.log(response.body);
        expect(response.status).toEqual(200);
        expect(tempMountain.name).toEqual('Mt. Evans');
        expect(tempMountain.location).toEqual('Colorado');
        expect(tempMountain.elevation).toEqual('14,235');
        expect(tempMountain.id).toEqual(mountainId);
      });
  });

  
  

  // test('should respond with 400 status code and bad request if no request body was provided or the body was invalid', () => {
  //   return superagent.post('http://localhost:3000/api/mountains')
  //     .set('Content-Type', 'application/json')
  //     .send({
      
  //     }) // ** .send ** returns a promise
  //     .then(response => {
  //       expect(response.status).toEqual(400);
  //       expect(response.body).toBe(null);
  //       expect(response.badRequest).toEqual('Bad Request');
  //     });
  // });
});