//var dbString = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/test';
var dbString = process.env.CLEARDB_DATABASE_URL || "mysql://monty:some_pass@localhost:3306/addressbook?reconnect=true";

require("./app").start(dbString, function(app) {
	var port = process.env.PORT || 3000;
	console.log("Started on ", port);
	app.listen(port);
});

