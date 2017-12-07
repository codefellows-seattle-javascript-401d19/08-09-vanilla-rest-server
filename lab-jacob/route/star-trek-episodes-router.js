'use strict';

const StarTrek = require('../model/star-trek-episodes');
const router = require('../lib/router');
const logger = require('../lib/logger');

let starTrekEpisodesArr = [];

let sendStatus = (response,status,message) => {
  logger.log('info',`Responding with a ${status} code due to ${message}`);

  response.writeHead(status);
  response.end();
};

let sendJSON = (response,status,jsonData) => {
  logger.log('info',`Responding with a ${status} code and the following data`);
  logger.log('info',jsonData);
  response.writeHead(status,{
    'Content-Type' : 'application/json',
  });

  response.write(JSON.stringify(jsonData));
  response.end();
  return;
};

router.post('/api/starTrekEpisodes', (request,response) => {

  if(!request.body){
    sendStatus(response,400,'body not found');
    return;
  }
  if(!request.body.episode){
    sendStatus(response,400,'title not found');
    return;
  }
  if(!request.body.episodeTitle){
    sendStatus(response,400,'content not found');
    return;
  }
  if(!request.body.episodeDescription){
    sendStatus(response,400,'content not found');
    return;
  }

  let starTrekEpisodes = new StarTrek(request.body.episode,request.body.episodeTitle,request.body.episodeDescription);
  starTrekEpisodesArr.push(starTrekEpisodes);
  sendJSON(response,200,starTrekEpisodes);
});