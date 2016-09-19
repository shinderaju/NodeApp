// server.js

var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var configDB = require('./config/database.js');

// configuration
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.configure(function() {


	app.use(express.logger('dev'));
	app.use(express.cookieParser()); // read cookies (needed for auth)
	app.use(express.bodyParser()); // get information from html forms

	app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
	app.use(express.session({ secret: 'secret' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(flash()); 

});

// routes
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch
app.listen(port);
console.log('used port is ' + port);
