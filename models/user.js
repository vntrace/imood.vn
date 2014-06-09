var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var User = new Schema({
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	name: {type: String},
	provider: {type: String, default: 'local'}
});

User.pre('save', function(next){
	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
		if(err) return next(err);
		bcrypt.hash(user.password, salt, function(err, hash){
			if(err) return next();
			user.password = hash;
			next();
		});
	});
});

User.methods.comparePassword = function(password, done) {
	bcrypt.compare(password, this.password, function(err, isMatch){
		if(err) return done(err);
		done(isMatch);
	});
};