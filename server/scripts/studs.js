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
server.get('/studs/get', studs_get);

function studs_put(req, res, next) {
    req.table = 'studs';
    helper.generic_put(req,res,next);
}
server.put('/studs/put', studs_put);