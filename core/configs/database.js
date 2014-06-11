var mongoose = require('mongoose')
  , path = require('path')
  , fs     = require('fs');

module.exports = function(app, config) {
	mongoose.connect(config.mongoUri);

	fs.readdir(path.join(config.root, 'models'), function(err, list){
		list.forEach(function(file){
			require(path.join(config.root, 'models', file));
		});
	});
};

