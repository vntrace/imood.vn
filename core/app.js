var when = require('when')
  , config = require('./configs')
  , express = require('express')
  , auth = require('./auth');

var BEGuide = function(root) {
	this.root = root;
};

/**
 * Load BE App configuration
 */
BEGuide.prototype.loadConfig = function(dictionary, env) {
	var deferred = when.defer();
	try {

		this.config = require(dictionary + env + '.config');
		this.config.env = env;
		this.config.root = this.root;

		deferred.resolve();
	} catch (e) {
		deferred.reject(e);
	}

	return deferred.promise;
};

BEGuide.prototype.start = function() {
	var app = express();
		app.set('auth', auth);
		
	// Config express
	config.express(app, this.config);
	// Config passport
	config.passport(app, this.config);
	// Config router
	config.router(app, this.config);
	// Config database
	config.database(app, this.config);

	app.listen(this.config.port, function(){
		console.log('App start !!!');
	});
};

module.exports = BEGuide;