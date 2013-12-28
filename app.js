var express = require("express");
var MongoClient = require('mongodb').MongoClient;

exports.start = function(dbName, callback) {
    MongoClient.connect(dbName, function(err, db) {
	    var contacts = db.collection('contacts3');
		var app = express();

		app.use(express.bodyParser());
		app.use(express.static(__dirname + '/public'));

		app.delete("/api/contacts", function(req, res) {
		    contacts.remove({}, function(err) {
		    	if (err) { console.log(err); res.send(500); return; }
		    	res.send(200);
		    });
		});

		app.get("/api/contacts", function(req, res) {
		    contacts.find().toArray(function(err, results) {
		    	if (err) { console.log(err); res.send(500); return; }
		    	res.send(results);
		    });
		});

		app.post("/api/contacts", function(req,res) {
		    contacts.insert(req.body, function(err, docs) {
		    	if (err) { console.log(err); res.send(500); return; }
				res.send(201);
		    });
		});
		callback(app);
	});
};
