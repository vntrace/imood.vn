var passport = require('passport');

var routers = {
	index: function(req, res, next) {
		res.render('index', {  });	
	},
	login: function(req, res, next) {
		res.render('login', {});
	},
	logout: function(req, res, next) {
		req.logout();
  		res.redirect('/login');
	}
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.get('/', routers.index);
	app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next){
		res.redirect('/');
	});

	app.get('/logout', routers.logout);
};