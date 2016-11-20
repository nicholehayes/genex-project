/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function owner_get(req, res, next) {
    req.table = 'owner';
    helper.generic_get(req,res,next);
}
server.get('/owner/get', owner_get);

function owner_put(req, res, next) {
    req.table = 'owner';
    helper.generic_put(req,res,next);
}
server.put('/owner/put', owner_put);

function owner_add(req, res, next) {
    res.send(501, "Not implemented");
}
server.put('/owner/add', owner_add);