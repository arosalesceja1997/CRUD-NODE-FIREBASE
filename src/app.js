const express = require('express');
const morgan = require('morgan');	// Middleware siempre enmedio de las peticiones
const exphbs = require('express-handlebars');
const path =require('path');

const app = express();

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
	defaultLayout: 'main',
	extname: '.hbs'
}));
app.set('views engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));

// Routes
app.use(require('./routes/index'));

// Static files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;