'use strict';

const Sweet = require(`../model/sweet`);
const logger = require(`../lib/logger`);

const lemon = new Sweet(`Lemon Meringue Pie`, false, `cold`);
const iceCream = new Sweet(`Chocolate Peanute Butter Ice Cream`, true, `cold`);
const sugarCookie = new Sweet(`Sugar Cookie`, false, `hot`);

let sweets = [lemon, iceCream, sugarCookie];
