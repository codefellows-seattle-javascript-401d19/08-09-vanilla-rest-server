'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/planet',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/planet')
      .set('Content-Type','application/json')
      .send({
        name: 'BD032562b',
        content: '11h50m1555sDeclination02d45m365s',
      })//send returns a promise.
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.name).toEqual('BD032562b');
        expect(response.body.content).toEqual('11h50m1555sDeclination02d45m365s');

        expect(response.body.discoverDate).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
});

//TODO: Write tests to ensure the / api / resource - name endpoint responds as described for each condition below:
// TODO:GET: test 404, it should respond with 'not found' for valid requests made with an id that was not found
// TODO:GET: test 200, it should contain a response body for a request made with a valid id
// TODO:POST: test 400, it should respond with 'bad request' if no request body was provided or the body was invalid
// TODO:POST: test 200, it should respond with the body content for a post request with a valid body