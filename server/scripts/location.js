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
server.get('/location/get', location_get);

function location_put(req, res, next) {
    req.table = 'location';
    helper.generic_put(req,res,next);
}
server.put('/location/put', location_put);

function location_all_units(req, res, next) {
    var sql = "SELECT location.location_id, location.tank_number, location.pie, location.box, COALESCE(SUM(storage.units), 0) AS total_units FROM location LEFT OUTER JOIN storage ON storage.location_id = location.location_id GROUP BY location.location_id ORDER BY location.location_id ASC";
    helper.sqlWrapper(sql,[],res,next);
}
server.get('/location/all_unit_count', location_all_units);