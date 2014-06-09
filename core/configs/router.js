var path = require('path');

module.exports = function(app, config) {
	require(path.join(config.root, 'routes', 'index'))(app, config);
};