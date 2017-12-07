'use strict';

const server = require(`../lib/server`);
const superagent = require(`superagent`);

describe(`/api/sweets`, () => {
  beforeAll(server.start);
  afterAll(server.stop);

  test(`GET should respond with 404 status for valid requests made with an id that was not found`, () => {
    return superagent.get(`http://localhost:3000//api/sweets`)
      .then(response => {
        expect(response.status).toEqual(404);
      });
  });
});
