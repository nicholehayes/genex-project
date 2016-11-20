/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function customer_get(req, res, next) {
    req.table = 'customer';
    helper.generic_get(req, res, next, 'last_name');
}
server.get('/customer/get', customer_get);

function customer_put(req, res, next) {
    req.table = 'customer';
    helper.generic_put(req,res,next);
}
server.put('/customer/put', customer_put);

function customer_add(req, res, next) {
    if (!req.body.first_name ||
        !req.body.last_name ||
        !req.body.street ||
        !req.body.city ||
        !req.body.state ||
        !req.body.zipcode ||
        !req.body.phone_number ||
        !req.body.email
    ) {
        res.send(400, "Missing arguments.");
        return next();
    }

    var val = [
        req.body.first_name,
        req.body.last_name,
        req.body.street,
        req.body.city,
        req.body.state,
        req.body.zipcode,
        req.body.phone_number,
        req.body.email
    ];

    var sql = 'INSERT INTO customer ' +
        '(first_name, last_name, street, city, state, zipcode, phone_number, email)' +	
        'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

    helper.sqlWrapper(sql,val,res,next);
}
server.put('/customer/add', customer_add);