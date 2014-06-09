var when = require('when');
// App Environment
var ENV = process.env.NODE_ENV || 'dev';
// Main core app
var app = require('./core/app');
	app = new app(__dirname);

// Load configuration
app.loadConfig(__dirname + '/config/', ENV).then(function(){
	// Start your app
	app.start();
}, function(e){
	// It might fail
	console.log(e);
});