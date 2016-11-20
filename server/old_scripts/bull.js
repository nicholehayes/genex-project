module.exports = {
	get_bull(req, res, next) {
		global.fixParamsIfNameValue(req);
		var sel = [
			req.params.breed_abbreviation ? req.params.breed_abbreviation : "%",
			req.params.bull_id ? req.params.bull_id : "%",
			req.params.name ? req.params.name : "%",
			req.params.registration_number ? req.params.registration_number : "%",
			req.params.css_certification ? req.params.css_certification : "%",
			req.params.dob ? req.params.dob : "%"
			];
		var sql = 'SELECT * FROM bull WHERE ' +
		'breed_abbreviation LIKE ? AND bull_id LIKE ? AND name LIKE ? AND ' + 
		'registration_number LIKE ? AND css_certification LIKE ? AND dob LIKE ?';

		console.log("get_bull_args");
		global.pool.getConnection(function (err, connection) {
			if(err) { return next(err); }
		
			connection.query(sql, sel, function(error, results, fields) {
				res.send(JSON.stringify(results));
				connection.release();
			});
			return next();
		});
	},
	add_bull(req, res, next) {
		global.fixParamsIfNameValue(req);
		
		var sql1 = "(SELECT max(`bull_id`)+1 from `bull` where `breed_abbreviation` LIKE ? )";
		var sql2 = "INSERT INTO `bull` (bull_id, breed_abbreviation, name, " + 
			"registration_number, css_certification, dob) " + 
			"VALUES (?,?,?,?,?,?)";
		var ba = req.params.breed_abbreviation;
	
		console.log(req.params);
		console.log(req.body);
		console.log(req.params.breed_abbreviation);
		
		var sel = [
				req.params.breed_abbreviation,
				req.params.name,
				req.params.registration_number,
				req.params.css_certification,
				req.params.dob
		];
		
		console.log("Sel:\n"+sel);
		
		global.pool.getConnection(function(err, connection) {
			if(err) { return next(err); }
			
			connection.query(sql1, [ba], function(error, results, fields) {
				if(error) { res.send(error); return; }
				console.log(results);
				console.log(fields);
				var id = results[0][fields[0].name] ? results[0][fields[0].name] : 1;
				sel.unshift(id);
				console.log(sel);
				connection.query(sql2, sel, function(error, results, fields) {
					if(error) { res.send(error); return; }
					res.send(results);
					return;
				});
			});

			return next();
		});
	},
	add_bull_pic(req, res, next) {
		
	}
}
