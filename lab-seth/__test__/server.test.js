'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/planet',() => {
  beforeAll(server.start);
  afterAll(server.stop);
  let testId, testArray;
  let falseTestId = 31245;

  let testName = 'BD032562b';
  let testContent = '11h50m1555sDeclination02d45m365s';

  test('POST should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/planet')
      .set('Content-Type','application/json')
      .send({
        name: testName,
        content: testContent,
      })
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.name).toEqual('BD032562b');
        expect(response.body.content).toEqual('11h50m1555sDeclination02d45m365s');
        expect(response.body.discoverDate).toBeTruthy();
        expect(response.body.id).toBeTruthy();
        testId = response.body.id;
        testArray = response.body;
      });
  });

  test('POST should respond with 400 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/planet')
      .set('Content-Type','application/json')
      .send('{ broken: failedValue ')
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(400);
      });
  });

  // test('GET should respond with 200 status code and an array of planets if there are no errors', () => {
  //   return superagent.get('http://localhost:3000/api/planet')
  //     .then(response => {
  //       expect(response.status).toEqual(200);
  //       expect(response.body.length).not.toBe(0 || -1);
  //       expect(response.body[0].name).toEqual(testName);
  //       expect(response.body[0].id).toEqual(testId);
  //       expect(response.body[0].content).toEqual(testContent);
  //       expect(response.body[0]).toEqual(testArray);
  //     });
  // });

  // test('GET should respond with 200 status code and  a specific planet if there are no errors', () => {
  //   return superagent.get(`http://localhost:3000/api/planet?id=${testId}`)
  //     .then(response => {
  //       expect(response.status).toEqual(200);
  //       expect(response.body.id).toEqual(testId);
  //     });
  // });

  // test('GET should respond with 404 status code if there are no errors', () => {
  //   return superagent.get(`http://localhost:3000/api/planet?id=${falseTestId}`)
  //     .then(response => Promise.reject(response))
  //     .catch(response => {
  //       expect(response.status).toEqual(404);
  //     });
  // });

  // test('DELETE should respond with 204 status code if there are no errors', () => {
  //   return superagent.delete(`http://localhost:3000/api/planet?id=${testId}`)
  //     .then(response => {
  //       expect(response.status).toEqual(204);
  //       expect(response.body).toBe('');
  //     });
  // });

  // test('DELETE should respond with 404 status code if there are no errors', () => {
  //   return superagent.delete(`http://localhost:3000/api/planet?id=${falseTestId}`)
  //     .then(response => Promise.reject(response))
  //     .catch(response => {
  //       expect(response.status).toEqual(404);
  //     });
  // });
});