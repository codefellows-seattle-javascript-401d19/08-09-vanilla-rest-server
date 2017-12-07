'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/notes',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with 200 status code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/notes')
      .set('Content-Type','application/json')
      .send({
        'episode' : '1',
        'episodeTitle' : 'episodeTitle',
        'episodeDescription' : 'episodeDescription',
      })
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.episodeTitle).toEqual('Encounter At Farpoint');
        expect(response.body.episodeDescription).toEqual(`In 2364, the newest flagship of the United Federation of Planets, Starfleet's USS Enterprise, travels to the planet Deneb IV for its maiden voyage.`);
        expect(response.body.episode).toEqual('1');

        expect(response.body.timestamp).toBeTruthy();
        expect(response.body.id).toBeTruthy();
      });
  });
});