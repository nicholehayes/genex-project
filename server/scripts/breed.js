/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function breed_get(req, res, next) {
    req.table = 'breed';
    helper.generic_get(req,res,next);
}

//Register endpoints
server.get('/breed/get', breed_get);