'use strict';

const server = require('../lib/server');
const superagent = require('superagent');

describe('/api/starTrekEpisodes',() => {
  beforeAll(server.start);
  afterAll(server.stop);

  test('should respond with status 200 code and a body if there are no errors', () => {
    return superagent.post('http://localhost:3000/api/starTrekEpisodes')
      .set('Content-Type','application/json')
      .send({
        'episode' : '1',
        'episodeTitle' : 'Encounter At Farpoint',
        'episodeDescription' : `In 2364, the newest flagship of the United Federation of Planets, Starfleet's USS Enterprise, travels to the planet Deneb IV for its maiden voyage.`,
      })
      .then(response => {
        expect(response.status).toEqual(200);

        expect(response.body.episodeTitle).toEqual('Encounter At Farpoint');
        expect(response.body.episodeDescription).toEqual(`In 2364, the newest flagship of the United Federation of Planets, Starfleet's USS Enterprise, travels to the planet Deneb IV for its maiden voyage.`);
        expect(response.body.episode).toEqual('1');
        expect(response.body.id).toBeTruthy();
      });
  });
  test('Should update memory, respond with 200 and create new JSON object of a Star Trek info if there no errors ', () => {
    return superagent.get('http://localhost:3000/api/starTrekEpisodes')
      .set('Content-Type','application/json')
      .send({
        'episode' : '2',
        'episodeTitle' : 'Encounter at Farpoint Part 2',
        'episodeDescription' : `The Enterprise crew tries to solve the riddle of Farpoint Station to avoid being condemned by Q's tribunal.`,
      })
      .then(response => {
        expect(response.status).toEqual(200);
  
        expect(response.body.episodeTitle).toEqual('Encounter at Farpoint Part 2');
        expect(response.body.episodeDescription).toEqual(`The Enterprise crew tries to solve the riddle of Farpoint Station to avoid being condemned by Q's tribunal.`);
        expect(response.body.episode).toEqual('2');
        expect(response.body.id).toBeTruthy();
      });
  });
});