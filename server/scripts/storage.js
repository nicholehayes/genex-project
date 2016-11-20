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
server.get('/storage/get', storage_get);

function storage_put(req, res, next) {
    req.table = 'storage';
    helper.generic_put(req,res,next);
}
server.put('/storage/put', storage_put);