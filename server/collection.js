module.exports = {
	get_collection(req, res, next) {
		global.fixParamsIfNameValue(req);
		var sel = [
			req.params.collection_id ? req.params.collection_id : '%',
			req.params.bull_id ? req.params.bull_id : '%',
			req.params.breed_abbreviation ? req.params.breed_abbreviation : '%',
			req.params.stud_code ? req.params.stud_code : '%',
			req.params.date ? req.params.date : '%',
			req.params.protocol ? req.params.protocol : '%',
			req.params.volume ? req.params.volume : '%',
			req.params.motility ? req.params.motility : '%', 
			req.params.units ? req.params.units : '%',
			req.params.notes ? req.params.notes : '%'
		]

		var sql = 'SELECT * FROM collection WHERE ' +
			'collection_id LIKE ? AND bull_id LIKE ? AND breed_abbreviation LIKE ? ' +
			'AND stud_code LIKE ? AND date LIKE ? AND protocol LIKE ? AND volume LIKE ? ' +
			'AND motility LIKE ? AND units LIKE ? and notes LIKE ?';

		console.log("get_collection");
		global.pool.getConnection(function(err, connection) {
			if(err) { return next(err); }
			connection.query(sql, sel, function(error, results, fields) {
				if(error) { res.send(400, error); connection.release(); return; }
				res.send(JSON.stringify(results));
				connection.release();
			});
		});
		return next();
	},	
	get_remaining_units(req, res, next) {
		global.fixParamsIfNameValue(req);
		if(!req.params.collection_id) {
			res.send(400, "Incorrect arguments. Expected collection_id.");
			return next();
		}
		
		global.pool.getConnection(function(err, connection) {
			if(err) { res.send(500, "Could not get connection"); return;}
			var sql = "SELECT units FROM collection WHERE " +
				"collection_id LIKE ?";
			var sel = [req.params.collection_id];
			connection.query(sql,sel, function(error, results, fields) {
				if(error) { res.send(500, error); return };
				if(results.length != 1) {
					res.send(500, "Query resulted in 0 or >1 entries.");
					return;
				}
				var count = results[0]['units'];
				sql = "SELECT units FROM storage WHERE collection_id LIKE ?";
				connection.query(sql,sel,function(error, results, fields) {
					if(error) { res.send(500,error); return }
					results.forEach(function(e) {
						count -= e['units'];
					});
					res.send(JSON.stringify({"units_remaining" : count }));
				});
			});
		});
		return next();
	}
}

