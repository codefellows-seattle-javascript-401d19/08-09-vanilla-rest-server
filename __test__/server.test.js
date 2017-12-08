'use strict';

const server = require(`../lib/server`);
const superagent = require(`superagent`);

let id = '';

let sweetSuccess =
  {
    name: 'Lemon Meringue Pie',
    hasChocolate: 'false',
    temperature: 'cold'
  }

let failSweet = {
  id: '12345sweet',
  name: 'Lemon Meringue Pie',
  hasChocolate: 'false'
}

describe(`/api/sweets`, () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test(`POST should respond with 200 status and post the submitted data if no errors are present`, () => {
    return superagent.post(`http://localhost:3000/api/sweets`)
    .set('Content-type', 'application/json')
    .send(sweetSuccess)
    .then(response => {
      id = response.body.id;
      console.log(response.body.id, `is the response body id`);
      expect(response.status).toEqual(200);
    })
  })
  test(`POST should respond with 404 status if no body is provided or the body is invalid`, () => {
    return superagent.post(`http://localhost:3000/api/sweets`)
    .set('Content-type', 'application/json')
    .send(failSweet)
    .then(response => Promise.reject(response))
    .catch(response => {
      expect(response.status).toEqual(404);
    })
  })
  test(`GET should respond with 200 status and return the response body for requests containing a valid id`, () => {
    return superagent.get(`http://localhost:3000/api/sweets?id=${id}`)
      .then(response => {
        expect(response.status).toEqual(200);
      });
  });
  test(`GET should respond with 404 status when passed an id that doesn't match any sweet`, () => {
    return superagent.get(`http://localhost:3000/api/sweets?id=nothing`)
      .then(response => Promise.reject(response))
      .catch(response => {
        expect(response.status).toEqual(404);
      });
  });
});
