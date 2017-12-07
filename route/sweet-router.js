'use strict';

const Sweet = require(`../model/sweet`);
const router = require(`../lib/router`);
const logger = require(`../lib/logger`);

let sweets = [];

// let sendStatus = (response,status,message) => {
//   logger.log('info',`Responding with a ${status} code due to ${message}`);
//
//   response.writeHead(status);
//   response.end();
// };
//
// let sendJSON = (response,status,jsonData) => {
//   logger.log('info',`Responding with a ${status} code and the following data`);
//   logger.log('info',jsonData);
//   response.writeHead(status,{
//     'Content-Type' : 'application/json',
//   });
//
//   response.write(JSON.stringify(jsonData));
//   response.end();
//   return;
// };
//
// router.post('/api/sweets', (request,response) => {
//   if(!request.body){
//     sendStatus(response,400,'body not found');
//     return;
//   }
//   if(!request.body.name){
//     sendStatus(response,400,'name not found');
//     return;
//   }
//   if(!request.body.temperature){
//     sendStatus(response,400,'temperature not found');
//     return;
//   }
//   let sweet = new Sweet(request.body.name, request.body.hasChocolate, request.body.temperature);
//   sweets.push(sweet);
//   sendJSON(response,200,sweet);
// });
//
// router.get('/api/sweets', (request, response) => {
//   if(){
//     sendStatus(response, 404, 'not found');
//   }
//   sendJSON(response, 200, sweets);
// });

// router.delete('/api/sweets/')
