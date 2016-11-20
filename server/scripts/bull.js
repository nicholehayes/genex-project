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

function bull_add(req, res, next) {

    if( !req.body.breed_abbreviation ||
        !req.body.name ||
        !req.body.registration_number ||
        !req.body.css_certification ||
        !req.body.dob
    ) {
        res.send(400,"Missing arguments.");
        return next();
    }

    var sql1 = "(SELECT max(`bull_id`)+1 AS new_id from `bull` where `breed_abbreviation` LIKE ? )";
    var sql2 = "INSERT INTO `bull` (bull_id, breed_abbreviation, name, " + 
        "registration_number, css_certification, dob) " + 
        "VALUES (?,?,?,?,?,?)";

    var ba = req.body.breed_abbreviation;
    
    var sel = [
            req.body.breed_abbreviation,
            req.body.name,
            req.body.registration_number,
            req.body.css_certification,
            req.body.dob
    ];

    helper.sqlWrapper(sql1, [ba], res, next, function(row, fields) {
        var id = row[0]['new_id'];
        sel.unshift(id);
        helper.sqlWrapper(sql2,sel,res,next);
    });
}

//Register endpoints
server.get('/bull/get', bull_get);
server.put('/bull/add', bull_add);