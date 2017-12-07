'use strict';

const logger = require('../lib/logger');
const urlMod = require('url');

const reqParser = module.exports = {};

reqParser.parse = req => {
  return new Promise((resolve, reject) => {
    logger.log('info', `Original URL: ${JSON.stringify(req.url)}`);
    req.url = urlMod.parse(req.url, true);
    logger.log('info', `Parsed URL: ${JSON.stringify(req.url)}`);

    if(req.method !== 'POST' && req.method !== 'PUT')
      return resolve(req);
    
    let sentText = '';
    req.on('data', buffer => {
      sentText += buffer.toString();
    });

    req.on('end', () => {
      try {
        if(req.headers['Content-Type'].includes('application/json')) { // TODO: If broken, change back to original code
          req.body = JSON.parse(sentText);
          return resolve(req);
        } else
          return reject(req);
      } catch(err) {
        return reject(err);
      }
    });
  });
};