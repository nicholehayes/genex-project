/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function location_get(req, res, next) {
    req.table = 'location';
    helper.generic_get(req,res,next);
}

//Register endpoints
server.get('/location/get', location_get);