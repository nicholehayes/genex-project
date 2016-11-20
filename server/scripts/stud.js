/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function stud_get(req, res, next) {
    req.table = 'stud';
    helper.generic_get(req,res,next);
}
server.get('/stud/get', stud_get);

function stud_put(req, res, next) {
    req.table = 'stud';
    helper.generic_put(req,res,next);
}
server.put('/stud/put', stud_put);