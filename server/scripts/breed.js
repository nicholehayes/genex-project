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
server.get('/breed/get', breed_get);

function breed_put(req, res, next) {
    req.table = 'breed';
    helper.generic_put(req,res,next);
}
server.put('/breed/put', breed_put);