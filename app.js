var express = require("express");

var app = express();
var storedContacts = [
		{firstName: "Darth", lastName: "Vader"},
		{firstName: "Anakin", lastName: "Skywalker"}
		];


app.use(express.bodyParser());
app.use(express.static(__dirname + '/public'));

app.get("/api/contacts", function(req, res) {
	res.send(storedContacts);
});
app.post("/api/contacts", function(req,res) {
	storedContacts.push(req.body);
	res.send(201);
});


exports.app = app;

