/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function storage_get(req, res, next) {
    req.table = 'storage';
    helper.generic_get(req,res,next);
}

//Register endpoints
server.get('/storage/get', storage_get);