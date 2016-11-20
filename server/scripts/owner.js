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

function owner_add(req, res, next) {
    res.send(501, "Not implemented");
}

//Register endpoints
server.get('/owner/get', owner_get);
server.put('/owner/add', owner_add);