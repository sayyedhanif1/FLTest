
/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require("mongoose");


var homeController = require('./controllers');
var config = require('./config');
var templateController = require('./controllers/template');


mongoose.connect(config.dbUrl);

var app = express();

// all environments
app.set('port', process.env.PORT || 3030);
app.engine('html', require('ejs').renderFile); 
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.bodyParser());
app.use(express.urlencoded());
app.use(express.methodOverride());
 
app.use(express.cookieParser() );
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res) {
    return res.status(404).json('404 Not found!');
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.log('Error : ' + err);
  return res.json({error: err});
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// 
app.get('/', homeController.index);

// template url
app.post('/templates', templateController.create);
app.get('/templates',templateController.index);
app.get('/templates/:id',templateController.show);
app.put('/templates/:id', templateController.update);
app.delete('/templates/:id',templateController.delete)




http.createServer(app).listen(app.get('port'), function(){
console.log('Express server listening on port ' + app.get('port'));
});
