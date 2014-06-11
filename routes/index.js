var passport = require('passport'),
	mongoose = require('mongoose');

var routers = {
	index: function(req, res, next) {
		res.render('index', {  });	
	},
	login: function(req, res, next) {
		var UserModel = mongoose.model('User');

		UserModel.findOne({
			email: 'clgt@clgt.vn'
		}, function(err, user){
			if(err) return console.log(err);

			console.log(user.authenticate('letmdein'));
		});
		
		res.send('ok');
	},
	logout: function(req, res, next) {
		req.logout();
  		res.redirect('/login');
	},
	register: function(req, res, next) {
		var UserModel = mongoose.model('User');

		var user = new UserModel({
			email: 'clgt@clgt.vn',
			password: 'letmein',
			name: 'Thanh Dc'
		});

		user.save(function(err){
			console.log(err);
		});

		res.send('ok');
	}
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.get('/', routers.index);
	app.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), function(req, res, next){
		res.redirect('/');
	});

	app.get('/logout', routers.logout);

	app.get('/login', routers.login);
	app.get('/register', routers.register);
};