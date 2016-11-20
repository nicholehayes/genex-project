module.exports = {
	get_storage(req, res, next) {
		global.fixParamsIfNameValue(req);
		var sel = [
			req.params.collection_id ? req.params.collection_id : '%',
			req.params.tank_number ? req.params.tank_number : '%',
			req.params.pie ? req.params.pie : '%',
			req.params.box ? req.params.box : '%',
			req.params.units ? req.params.units : '%' 
		]
		
		var sql = 'SELECT * from storage WHERE ' +
			'collection_id LIKE ? AND tank_number LIKE ? AND ' +
			'pie LIKE ? AND box LIKE ? AND units LIKE ?';
		
		console.log('get_storage');
		global.pool.getConnection(function(err, connection) {
			if(err) { return next(err); }
			connection.query(sql, sel, function(error, results, fields) {
				if(error) { res.send(400, error); connection.release(); return; }
				res.send(JSON.stringify(results));
				connection.release();
			});
		});

	}
}
