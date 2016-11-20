var restify = require('restify');
var mysql = require('mysql');
fs = require('fs');

global.pool = mysql.createPool({
	connectionLimit : 16,
	host : 'localhost',
	user : 'root',
	password : 'database3',
	database : 'cg'
});

var server = restify.createServer({
	name: 'CSC4402-Server'
});

server.use(restify.CORS());
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

server.listen(8080);

function pong(req, res, next) {
	res.send('pong');
	return next();
}

global.fixParamsIfNameValue = function(req) {
	if(!Array.isArray(req.params)) {
		return;
	}

	var newParams = {};

	//console.log("Fixing params");	
	
	req.params.forEach(function(val, index) {
		newParams[val.name] = val.value;
	});

	req.params = newParams;
}

var breed = require('./breed');
var customer = require('./customer');
var bull = require('./bull');	
var storage = require('./storage');
var collection = require('./collection');
var location = require('./location');

server.get('ping', pong);
server.get('get_breed', breed.get_breed);
server.post('add_customer', customer.add_customer);
server.get('get_customer', customer.get_customer);
server.get('get_bull', bull.get_bull);
server.post('add_bull', bull.add_bull);
server.post('add_bull_pic', bull.add_bull_pic);
server.get('get_storage', storage.get_storage);
server.get('get_collection', collection.get_collection);
server.get('get_collection_units_remaining', collection.get_remaining_units);
server.get('get_all_units_locations', location.get_all_locations_units);
