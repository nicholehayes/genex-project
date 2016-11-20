module.exports = {
	get_all_locations_units(req, res, next) {
		var sql = "SELECT location.location_id, location.tank_number, location.pie, location.box, COALESCE(SUM(storage.units), 0) FROM location LEFT OUTER JOIN storage ON storage.location_id = location.location_id GROUP BY location.location_id ORDER BY location.location_id ASC";
		global.pool.getConnection(function(err, connection) {
			if(err) { res.send(500, "Could not get db connection" + JSON.stringify(err)); return; }
			connection.query(sql, function(error, results, fields) {
				res.send(results);
				connection.close();
			});
		});
	}

}
