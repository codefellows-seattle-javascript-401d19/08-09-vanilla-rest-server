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

  const starTrekGetById = episodeGet => {
    return episodeGet.filter(elementEpisode => StarTrek.id === elementEpisode)[0];
  };
  
  const starTrekRemoveById = episodeRemove => {
    return episodeRemove.filter(id => StarTrek.id !== id);
  };

  let starTrekEpisodes = new StarTrek(
    request.body.episode,
    request.body.episodeTitle,
    request.body.episodeDescription);
  starTrekEpisodesArr.push(starTrekEpisodes);
  sendJSON(response,200,starTrekEpisodes);

  router.get(`/api/starTrekEpisodes`, (request, response) => {
    let id = req.url.query.id;
    if(id){
      let getEpisode = starTrekGetById(id);
      if(getEpisode) sendJSON(response, 200, getEpisode);
      else 
        sendStatus(response, 404, `Missing Episode ${id}`); 
    }
  }); 

  router.delete(`/api/starTrekEpisodes`, (request, response) =>{
    let id = req.url.query.id;
    if(id){
      let removeEpisode = starTrekRemoveById(id);
      if(removeEpisode)
        logger.log('info', `Episode with ${id} Removed from memory`);
    }else
      sendStatus(response, 404, `No Episode with ${id}`)
  });
  

  
});