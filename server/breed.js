module.exports = {
	get_breed(req, res, next) {
	console.log("get_breed");
		if(req.params.breed || req.params.abbr) {
			if(!req.params.breed) {
				req.params.breed = "%";
			} else if(!req.params.abbr) {
				req.params.abbr = "%";
			}
			return get_breed_args(req,res,next);
		} else {
			return get_breed_plain(res, next);
		}
	}
}

function get_breed_args(req,res,next) {
	var sql = 'SELECT * FROM breed WHERE breed LIKE ?'+
		' AND breed_abbreviation LIKE ?'

	console.log("get_breed_args");
	global.pool.getConnection( function(err, connection) {
		if(err) {
			return next(err);
		}
		
		connection.query(sql, [req.params.breed, req.params.abbr], 
			function(error, results, fields) {
			res.send(JSON.stringify(results));
			connection.release();
		});
		return next();
	});
}

function get_breed_plain(res,next) {
	var sql = 'SELECT * FROM breed'
	
	console.log('get_breed_plain');
	global.pool.getConnection( function(err, connection) {
		if(err) {
			return next(err);
		}

		connection.query(sql, function (error, results, fields) {
			res.send(JSON.stringify(results));
			connection.release();
		});
		return next();	
	});
}
