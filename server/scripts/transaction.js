/*
 *
 * This file contains transaction functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function transaction_get(req, res, next) {
    req.table = 'transaction';
    helper.generic_get(req,res,next);
}
server.get('/transaction/get', transaction_get);

function transaction_put(req, res, next) {
    req.table = 'transaction';
    helper.generic_put(req,res,next);
}
server.put('/transaction/put', transaction_put);

function transaction_add(req, res, next) {
    if(!req.body.trans_type) {
        res.send(400, "Missing transaction trans_type");
        return next();
    } else {
        if(req.body.trans_type == 1 || req.body.trans_type == 2) { //Discard
            console.log("*Discard or Ship transaction");
            if( !req.body.collection_id ||
                !req.body.units ||
                !req.body.datetime ||
                !req.body.from_location_id) 
            {
                res.send(400,"Missing arguments.");
                return next();
            }

            sql1 = "INSERT INTO transaction (collection_id, units, datetime, trans_type, from_location_id) VALUES (?,?,?,?,?)";
            sel1 = [
                req.body.collection_id,
                req.body.units,
                req.body.datetime,
                req.body.trans_type,
                req.body.from_location_id
            ];

            sql2 = "UPDATE storage SET units = units - ? WHERE collection_id = ? AND location_id = ?";
            sel2 = [
                req.body.units,
                req.body.collection_id,
                req.body.from_location_id
            ]

            helper.sqlWrapper(sql1,sel1, res, next, function(row, fields) {
                helper.sqlWrapper(sql2, sel2, res, next);
            });
        } else {
            console.log("*Ship transaction");
            if( !req.body.collection_id ||
                !req.body.units ||
                !req.body.datetime ||
                !req.body.from_location_id ||
                !req.body.to_location_id)
            {
                res.send(400,"Missing arguments.");
                return next();
            }

            sql1 = "INSERT INTO transaction (collection_id, units, datetime, trans_type, from_location_id, to_location_id) VALUES (?,?,?,?,?,?)";
            sel1 = [
                req.body.collection_id,
                req.body.units,
                req.body.datetime,
                req.body.trans_type,
                req.body.from_location_id,
                req.body.to_location_id
            ];

            sql2 = "UPDATE storage SET units = units - ? WHERE collection_id = ? AND location_id = ?";
            sel2 = [
                req.body.units,
                req.body.collection_id,
                req.body.from_location_id
            ]

            sql3 = "UPDATE storage SET units = units + ? WHERE collection_id = ? AND location_id = ?";
            sel3 = [
                req.body.units,
                req.body.collection_id,
                req.body.to_location_id
            ]

            helper.sqlWrapper(sql1,sel1, res, next, function(row, fields) {
                helper.sqlWrapper(sql2, sel2, res, next, function(row,fields) {
                    helper.sqlWrapper(sql3, sel3, res, next);
                });
            });
        }
    }
}
server.post('/transaction/add', transaction_add);