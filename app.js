var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var links = require('./links');
app.engine('.html', require('ejs').__express);
app.set('view engine', 'ejs');
app.use(links);
app.use(express.static('public'));
server.listen('8080', function(){
	console.log('Connected on 8080');
});