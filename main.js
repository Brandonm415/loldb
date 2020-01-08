/*
    Uses express, dbcon for database connection, body parser to parse form data
    handlebars for HTML templates
*/

var express = require('express');
var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
});

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 1111);
app.set('mysql', mysql);

/*
app.use('/people_certs', require('./people_certs.js'));

app.use('/planets', require('./planets.js'));
*/

//need below to load the public page
app.use('/', express.static('public'));

//Navigation pages
app.use('/', require('./home.js'));
app.use('/home', require('./home.js'));
app.use('/add', require('./addScript.js'));
app.use('/delete', require('./delete.js'));
app.use('/update', require('./update.js'));


app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
