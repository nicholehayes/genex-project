/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function collection_get(req, res, next) {
    req.table = 'collection';
    helper.generic_get(req,res,next);
}
function collection_remaining_units(req, res, next) {
    if(!req.query.collection_id) {
        res.send(400, "Incorrect arguments. Expected collection_id.");
        return next();
    }

    var sql = "SELECT units FROM collection WHERE " +
        "collection_id LIKE ?";
    var sel = [req.query.collection_id];

    helper.sqlWrapper(sql,sel,res,next,function(rows,fields) {
            if(rows.length != 1) {
                res.send(500, "Query resulted in 0 or >1 entries.");
                return next();
            }
            var count = rows[0]['units'];
            sql = "SELECT " + count + " - COALESCE(SUM(units), 0) AS unstored_units FROM storage WHERE collection_id LIKE ?";
            helper.sqlWrapper(sql,sel,res,next);
    });
}

//Register endpoints
server.get('/collection/get', collection_get);
server.get('/collection/remaining_units', collection_remaining_units);