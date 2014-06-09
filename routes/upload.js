var path = require('path');
var when = require('when');
var multiparty = require('multiparty');
var util = require('util');

var UploadHandler = function(req, res, callback) {
	this.req = req;
	this.res = res;
	this.callback = callback;
};

UploadHandler.prototype.setNoCacheHeaders = function() {
	this.res.setHeader('Pragma', 'no-cache');
    this.res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    this.res.setHeader('Content-Disposition', 'inline; filename="files.json"');
};

UploadHandler.prototype.uploadSingle = function(file, des, name) {
	var deferred = when.defer();
		require('fs').rename(
			file,
			path.join(des, name),
			function(error) {
				if(error) {
					deferred.reject(error);
				} else {
					deferred.resolve(name);
				}
			}
		);

	return deferred.promise;
};

UploadHandler.prototype.formParse = function() {
	var _this = this,
		deferred = when.defer();
	var form = new multiparty.Form({
		uploadDir: '/tmp'
	});

	form.parse(this.req, function(err, fields, files) {
		if(err) {
			deferred.reject(err);
		} else {
			deferred.resolve(files);
		}
	});	

	return deferred.promise;
}

UploadHandler.prototype.uploadTo = function(des) {
	var deferreds = [],
		deferred = when.defer(),
		_this = this;

	this.formParse()
		.then(function(files){
			Object.keys(files).forEach(function(field){
				deferreds.push(_this.uploadSingle(files[field][0].path, des, files[field][0].originalFilename));
			});
			return when.all(deferreds);
		}, function(err){
			deferred.reject(err);
		})
		.then(function(arrFileName){
			deferred.resolve(arrFileName);
		}, function(err){
			deferred.reject(err);
		});

	return deferred.promise;
};

module.exports = function(app, config) {
	var auth = app.get('auth');

	app.post('/upload', auth.requireLogin, function(req, res, next){
		var uploadHandler = new UploadHandler(req, res, next);
			uploadHandler.setNoCacheHeaders();

			uploadHandler.uploadTo(path.join(config.root, 'static', 'lol', 'items'))
				.then(function(fileName){
					res.json({
						status: true,
						fileName: fileName
					});
				}, function(err){
					res.json({
						status: false,
						msg: err
					});
				});
	});
};