var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var hbs = require('express-hbs');
var session = require('express-session');
var redis = require('redis');
var RedisStore = require('connect-redis')(session);
var flash = require('connect-flash');

module.exports = function(app, config) {
	app.locals.title = 'Guide App';
	app.locals.prod_env = 'prod' === config.env;
	app.locals.static_path = config.static_path;

	app.engine('hbs', hbs.express3({
	  	partialsDir: path.join(config.root, 'views', 'partials'),
	  	layoutsDir: path.join(config.root, 'views', 'layout'),
	}));

	app.set('view engine', 'hbs');
	app.set('views', path.join(config.root, 'views'));

	// Register view helper
	hbs.registerHelper('join', function(list, separator) {
		return new hbs.SafeString(list.join(separator));
	});

	hbs.registerHelper('toString', function(object){
		return JSON.stringify(object);
	});

	app.set('view cache', false);
  	app.use(favicon());
  	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());
	app.use(cookieParser(config.salt));
	app.use(session({ 
		store: new RedisStore({
			host: config.redis.host,
			port: config.redis.port
		}), 
		secret: config.secret,
		cookie : {
            maxAge: 1000*60*60*24*1000
        } 
    }));

    app.use(flash());
	app.use(logger('dev'));
  	app.use(express.static(path.join(config.root, 'public')));

	app.use(function(req, res, next) {
	    res.removeHeader("X-Powered-By");
	    next();
  	});

  	app.use(function(req, res, next){
  		app.locals.flash = {
  			flash_error: req.flash('error'),
  			flash_info: req.flash('info'),
  			flash_success: req.flash('success'),
  			flash_warning: req.flash('warning')
  		};

  		next();
  	});

  	if(app.get('env') === 'dev') {
	  	app.use(express.errorHandler());
  	}
};