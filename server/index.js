//NodeJS Requires
var restify = require('restify');
var mysql = require('mysql');
var util = require('util');

//Create the mysql pool
global.pool = mysql.createPool({
	connectionLimit: 32,
	host : 'localhost',
	user : 'root',
	password : 'database3',
	database : 'cg'
});

//Create the server
global.server = restify.createServer({
	name: 'CSC4402-Server', 
	handlesUpgrades: true //May be userful for images.
});

//Handy alias
var server = global.server;

//Set server options
server.use(restify.acceptParser(server.acceptable));
server.use(restify.CORS());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.fullResponse());   

//Register call recieved
//This is to make logging clearer
server.use(function(req, res, next) { 
	console.log("--- Endpoint: " + req.path()); 
	console.log("*Request:\n" + util.inspect({ "params" : req.params, "query" : req.query, "body" : req.body}));
	return next(); 
});

//Register root server options
function rootRes(req,res,next) { res.json({"status" : "running"}); return next()};
server.get('/', rootRes);
server.post('/', rootRes);
server.put('/', rootRes);

//Register the basic options for each function
//Each module automatically registers with the server.
require('./scripts/helper');
require('./scripts/breed');
require('./scripts/collection');
require('./scripts/owner');
require('./scripts/studs');
require('./scripts/bull');
require('./scripts/customer');
require('./scripts/location');
require('./scripts/storage');

//Report
console.log('!!! - CSC 4402 Server Started - !!!');
//console.log(util.inspect(server.router.mounts));

Object.keys(server.router.mounts).forEach(function(value) {
	var spec = server.router.mounts[value].spec;
	console.log("\t" + spec.method + " : " + spec.path);
});

//Start the server
server.listen(8080);