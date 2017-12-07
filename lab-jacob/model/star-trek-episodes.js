'use strict';

const uuid = require('uuid/v1');

class StarTrekEpisodes{

  constructor(episode, episodeTitle, episodeDescription){
    this.id = uuid();
    this.episode = episode;
    this.episodeTitle = episodeTitle;
    this.episodeDescription = episodeDescription;
  }
}

module.exports = StarTrekEpisodes;