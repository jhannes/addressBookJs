var dbString = process.env.MONGOHQ_URL || 'mongodb://127.0.0.1:27017/test';

require("./app").start(dbString, function(app) {
	var port = process.env.PORT || 3000;
	console.log("Started on ", port);
	app.listen(port);
});

