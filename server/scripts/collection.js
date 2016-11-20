/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function collection_get(req, res, next) {
    req.table = 'collection';
    helper.generic_get(req,res,next);
}

//Register endpoints
server.get('/collection/get', collection_get);