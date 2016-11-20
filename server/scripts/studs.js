/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function studs_get(req, res, next) {
    req.table = 'studs';
    helper.generic_get(req,res,next);
}

//Register endpoints
server.get('/studs/get', studs_get);