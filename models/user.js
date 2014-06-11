var mongoose = require('mongoose'),
	crypto = require('crypto'),
	salt = "FMlzz=oMUnU}G}8+$m@/Qfu`5?@A--1tx`9es`2Z_EDlB%4%OkidkY*O]T~!tzgQ",
    Schema = mongoose.Schema;

var User = new Schema({
	email: {type: String, required: true, unique: true},
	hashed_password: {type: String, required: true},
	name: {type: String},
	provider: {type: String, default: 'local'},
	updatedAt: {type: Date}
});

User
    .virtual('password')
    .set(function(password){
        this._password = password;
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function(){ return this._password; });

User.pre('save', function(next){
	var user = this;

	user.updatedAt = Date.now();

	next();
});

User.methods.authenticate = function(password) {
	return this.encryptPassword(password) === this.hashed_password;
};

User.methods.makeSalt = function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
};

User.methods.encryptPassword = function(password) {
	if (!password) return '';
    
    var encrypred;

    try {
        encrypred = crypto.createHmac('sha1', salt)
                          .update(password)
                          .digest('hex');
        return encrypred;
    } catch(err) {
        return '';
    }
};

module.exports = mongoose.model('User', User);