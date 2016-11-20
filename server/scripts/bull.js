/*
 *
 * This file contains breed functions.
 *
 */

var helper = require('./helper');
var server = global.server;

function bull_get(req, res, next) {
    req.table = 'bull';
    helper.generic_get(req,res,next);
}

function add_bull(req, res, next) {
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
}
//Register endpoints
server.get('/bull/get', bull_get);