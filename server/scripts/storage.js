/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;
var util = require('util');

function storage_get(req, res, next) {
    req.table = 'storage';
    helper.generic_get(req,res,next);
}
server.get('/storage/get', storage_get);

function storage_put(req, res, next) {
    req.table = 'storage';
    helper.generic_put(req,res,next);
}
server.put('/storage/put', storage_put);

function storage_list_units(req, res, next) {
    var sql = "SELECT collection.collection_id, location.tank_number, location.pie, location.box, storage.units, bull.breed_abbreviation, bull.bull_id, collection.date " +
    " FROM storage JOIN collection ON storage.collection_id=collection.collection_id JOIN location ON storage.location_id=location.location_id JOIN bull ON collection.bull_uid=bull.bull_uid "
    var sel = [];
    if(req.query && req.query.bull_uid) {
        sql += " WHERE collection.bull_uid = ? ";
        sel = [req.query.bull_uid];
    }
    sql += " ORDER BY date ASC";
    helper.sqlWrapper(sql,sel,res,next);
}
server.get('/storage/all_units', storage_list_units);