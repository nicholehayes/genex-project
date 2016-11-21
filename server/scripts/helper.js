/*
 *
 * This file contains generic helper functions.
 *
 */
const qs = require('querystring');
var util = require('util');

exports.sqlWrapper = function(sql, args, res, next, callback) {
	console.log("*Sql:\n\t"+sql);
	console.log("*Args:\n\t"+args);
	global.pool.query(sql, args, function(err, rows, fields) {
		if(err) { 
			console.log("*SqlErr:\n\t", util.inspect(err));
			res.json(500, err); 
			next(); 
		} else {
			//console.log("*SqlRow:\n\t", util.inspect(rows));
			if(!callback) {
				res.json(rows);
				return next();
			} else { 
				callback(rows, fields); 
			}
		}
	});
};

exports.generic_put = function(req, res, next) {
	if(!req.table) {
		res.send(500, "generic_put requires a table.");
	}

	if(Object.keys(req.body) == 0) {
		res.send(400, "generic_put requires at least 1 row.");
	}

	var sql = "INSERT INTO " + qs.escape(req.table) + " (";
	var sel = [];
	var end = ") VALUES (";
	Object.keys(req.body).forEach( function (value, index, array) {
			sql = sql + qs.escape(value);
			sel.push(req.body[value]);
			end = end + "?";
			if(index + 1 != array.length) {
				sql = sql + ", ";
				end = end + ", ";
			}
	});

	sql = sql + end + ")";

	console.log("Generic SQL: " + sql);
	console.log("Generic Sel: " + sel);

	exports.sqlWrapper(sql, sel, res, next, function(rows, fields) {
		res.json(rows);
		next();
	});
}

exports.generic_get = function(req, res, next, orderby, orderdir, joinby) {
	var sql = "";
	var sel = [];

	if(req.query) {
		if(req.query.order_by) {
			orderby = req.query.order_by;
			delete req.query.order_by;
		}
		if(req.query.order_dir) {
			orderdir = req.query.order_dir;
			delete req.query.order_dir;
		}
		if(req.query.join_by) {
			joinby = req.query.join_by;
			delete req.query.join_by;
		}
	}

	if(!req.table) {
		res.send(500, "generic_get requires table");
		next();
	} else {
		sql = "SELECT * FROM " + qs.escape(req.table);
	}

	if(joinby && Array.isArray(joinby)) {
		joinby.forEach(function(val, index, array) {
			sql += " JOIN " +  val.table + " ON " + val.col1 + "=" + val.col2;
		});
	}

	if(req.query && Object.keys(req.query).length > 0) {
		sql += " WHERE ";
		Object.keys(req.query).forEach(function(value, index, array) {
			sql = sql + qs.escape(req.table) + '.' + qs.escape(value) + " LIKE ? ";
			sel.push(req.query[value]);
			if(index + 1 != array.length) {
				sql = sql + "AND ";
			}
		});
	} 

	if(orderby) {
		sql += " ORDER BY " + orderby + " ";
		if(!orderdir) {
			sql += "ASC";
		} else {
			sql += orderdir;
		} 
	} 

	console.log("Generic SQL: " + sql);
	console.log("Generic Sel: " + sel);
	exports.sqlWrapper(sql, sel, res, next, function(rows, fields) {
		res.json(rows);
		next();
	});
}