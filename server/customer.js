var util = require('util');

module.exports = {
	add_customer(req, res, next) {
		console.log("add_customer");
		global.fixParamsIfNameValue(req);
		//console.log("creating array");
		
		var val = [
			req.params.first_name,
			req.params.last_name,
			req.params.street,
			req.params.city,
			req.params.state,
			req.params.zipcode,
			req.params.phone_number,
			req.params.email
		];
	
			//console.log("BODY\n"+util.inspect(req.body));
			//console.log("Params\n"+util.inspect(req.params));
			//console.log("Arr\n"+val);
			//console.log("Name: " + req.params.first_name + " " + req.params.last_name);
		if(
			!req.params.first_name ||
			!req.params.last_name ||
			!req.params.street ||
			!req.params.city ||
			!req.params.state ||
			!req.params.zipcode ||
			!req.params.phone_number ||
			!req.params.email
		) {
			
			res.send(400, "Bad input.");
			return next();
		}

		console.log("add_customer");
		return do_add_customer(val, res, next);
	},
	get_customer(req,res,next) {
		global.fixParamsIfNameValue(req);
		var val = [
			req.params.customer_id ? req.params.customer_id : "%",
			req.params.first_name ? req.params.first_name : "%",
			req.params.last_name ? req.params.last_name : "%",
			req.params.street ? req.params.street : "%",
			req.params.city ? req.params.city : "%",
			req.params.state ? req.params.state : "%",
			req.params.zipcode ? req.params.zipcode : "%",
			req.params.phone_number ? req.params.phone_number : "%",
			req.params.email ? req.params.email : "%"
		];
		
		//console.log("BODY\n"+util.inspect(req.body));
		//console.log("Params\n"+util.inspect(req.params));
		//console.log("Arr\n"+val);
		console.log("get_customer");
		return do_get_customer(val,res,next);
	}
}

function do_get_customer(val, res, next) {
	console.log("do_get_customer");
	var sql = "SELECT * FROM customer WHERE customer_id LIKE ? AND " + 
		"first_name LIKE ? AND last_name LIKE ? AND street LIKE ? AND city LIKE ? AND " +
		"state Like ? AND zipcode Like ? AND phone_number LIKE ? AND email LIKE ?" +
		"ORDER BY last_name ASC";
	global.pool.getConnection(function(err, connection) {
		if(err) {
			return next(err);
		}

		connection.query(sql, val, function(error, results, fields) {
			if(error) {
				console.log('Query error: ' + error.code);
				res.send(500, "Bad Query");
				return next();
			}
			res.send(JSON.stringify(results));
			connection.release();
			return next();
		});
	});
}

//Some sort of input validation should be done.
function do_add_customer(val, res, next) {
	console.log("do_add_customer");
	var sql = 'INSERT INTO customer ' +
	'(first_name, last_name, street, city, state, zipcode, phone_number, email)' +	
	'VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
	
	global.pool.getConnection(function(err, connection) {
		if(err) {
			return next(err);
		}
	
		connection.query(sql, val, function(error,results,fields) {
			res.send(JSON.stringify(results));
			connection.release();
		});

		return next();
	});	
}
