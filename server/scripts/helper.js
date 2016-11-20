/*
 *
 * This file contains generic helper functions.
 *
 */
const qs = require('querystring');

exports.sqlWrapper = function(sql, args, res, next, callback) {
	global.pool.query(sql, args, function(err, rows, fields) {
		if(err) { res.json(500, err); next(); }
		else { callback(rows, fields); }
	});
};

exports.generic_get = function(req, res, next) {
	if(!req.query || Object.keys(req.query).length == 0) {
		if(!req.table) {
			res.send(500, "generic_get requires table");
			next();
		} else {
			exports.sqlWrapper("SELECT * FROM " + qs.escape(req.table), [], res, next, function(rows, fields) {
				res.json(rows);
				next();
			});
		}
	} else {
		if(!req.table) {
			res.send(500, "generic_get requires table");
			next();
		} else {
			var sql = "SELECT * FROM " + qs.escape(req.table) + " WHERE ";
			var sel = [];
			Object.keys(req.query).forEach(function(value, index, array) {
				sql = sql + qs.escape(value) + " LIKE ? ";
				sel.push(req.query[value]);
				if(index + 1 != array.length) {
					sql = sql + "AND ";
				}
			});

			console.log("Generic SQL: " + sql);
			console.log("Generic Sel: " + sel);

			exports.sqlWrapper(sql, sel, res, next, function(rows, fields) {
				res.json(rows);
				next();
			});
		}
	} 
}