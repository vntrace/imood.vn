var passport = require('passport')
  , util = require('util')
  , LocalStrategy = require('passport-local').Strategy;

var users = [
	{ id: 1, username: 'admin', password: 'letmein', email: 'clgt@clgt.vn' }
];

function findById(id, fn) {
  	var idx = id - 1;
  	if (users[idx]) {
    	fn(null, users[idx]);
  	} else {
    	fn(new Error('User ' + id + ' does not exist'));
  	}
}

function findByUsername(username, fn) {
	for (var i = 0, len = users.length; i < len; i++) {
		var user = users[i];
		if (user.username === username) {
		  return fn(null, user);
		}
	}
	return fn(null, null);
}

passport.serializeUser(function(user, done) {
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	findById(id, function (err, user) {
		done(err, user);
	});
});

// Use the LocalStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a username and password), and invoke a callback
//   with a user object.  In the real world, this would query a database;
//   however, in this example we are using a baked-in set of users.
passport.use(new LocalStrategy(
	function(username, password, done) {
    	// asynchronous verification, for effect...
    	process.nextTick(function () {
      
		// Find the user by username.  If there is no user with the given
		// username, or the password is not correct, set the user to `false` to
		// indicate failure and set a flash message.  Otherwise, return the
		// authenticated `user`.
      	findByUsername(username, function(err, user) {
	        if (err) { return done(err); }
	        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
	        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
	        return done(null, user);
      	})
    });
  }
));

module.exports = function(app, config) {
	app.use(passport.initialize());
  	app.use(passport.session());
}