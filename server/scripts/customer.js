/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function customer_get(req, res, next) {
    req.table = 'customer';
    helper.generic_get(req,res,next);
}

//Register endpoints
server.get('/customer/get', customer_get);