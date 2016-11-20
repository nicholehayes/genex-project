/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
const qs = require('querystring');
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
    if(Object.keys(req.query).length > 0) {
        var wherestm = "WHERE ";
        var sel = [];

        Object.keys(req.query).forEach(function(val, index, array) {
            wherestm += qs.escape(val) + " LIKE ?";
            sel.push(qs.escape(req.query[val]));
            if(index + 1 != array.length) {
                wherestm += " AND ";
            }
        });

        var sql = "SELECT location.location_id, location.tank_number, location.pie, location.box, COALESCE(SUM(storage.units), 0) AS total_units FROM location LEFT OUTER JOIN storage ON storage.location_id = location.location_id "+
        wherestm + " GROUP BY location.location_id ORDER BY location.location_id ASC";
        helper.sqlWrapper(sql,sel,res,next);
    } else {
        var sql = "SELECT location.location_id, location.tank_number, location.pie, location.box, COALESCE(SUM(storage.units), 0) AS total_units FROM location LEFT OUTER JOIN storage ON storage.location_id = location.location_id GROUP BY location.location_id ORDER BY location.location_id ASC";
        helper.sqlWrapper(sql,[],res,next);
    }
}
server.get('/location/unit_count', location_all_units);