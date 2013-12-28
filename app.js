var express = require("express");
var Sequelize = require('sequelize');
var _ = require("underscore");

var createContactsController = function(app, path, table) {
	app.delete(path, function(req, res) {
	    table.findAll().complete(function(err, results) {
	    	if (err) { console.log(err); res.send(500); return; }
	    	res.send(results);

	    	_.each(results,function(row) {
	    		row.destroy().complete(function(err) {
			    	if (err) { console.log(err); res.send(500); return; }
	    		});
	    	});
	    });
	});

	app.get(path, function(req, res) {
	    table.findAll().complete(function(err, results) {
	    	if (err) { console.log(err); res.send(500); return; }
	    	res.send(results);
	    });
	});

	app.post(path, function(req,res) {
		var contact = req.body;
		var row = table.build({firstName: contact.firstName, lastName: contact.lastName });

	    row.save().complete(function(err) {
	    	if (err) { console.log(err); res.send(500); return; }
			res.send(201);
	    });
	});
};

exports.start = function(connection, callback) {
	connection = connection.split(/\?/)[0];

    var sequelize = new Sequelize(connection, {logging: false});

	var Contact = sequelize.define('Contact', {
	  firstName: Sequelize.STRING,
	  lastName: Sequelize.STRING
	});
	sequelize.authenticate().complete(function(err) {
	    if (err) {
	      console.log('Unable to connect to the database.', err);
	      return;
	    } 

		var app = express();

		app.use(express.bodyParser());
		app.use(express.static(__dirname + '/public'));

	    createContactsController(app, "/api/contacts", Contact);

		callback(app);
	});
};
