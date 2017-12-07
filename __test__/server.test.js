'use strict';

const server = require(`../lib/server`);
const superagent = require(`superagent`);

describe(`/api/sweets`, () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test(`POST should respond with 200 status and post the submitted data if no errors are present`, () => {
    return superagent.post(`http://localhost:3000/api/sweets`)
    .set('Content-type', 'application/json')
    .send({
      name: 'Lemon Meringue Pie',
      hasChocolate: 'false',
      temperature: 'cold'
    })
    .then(response => {
      expect(response.status).toEqual(200);
    })
  })
  test(`GET should respond with 200 status and return the response body for requests containing a valid id`, () => {
    return superagent.get(`http://localhost:3000/api/sweets`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
});
