'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

console.log('express.static exists?' + !!express.static);
console.log('path join exists? ' + !!path.join);

//from commitary client
// app.use(express.static(__dirname + '/dist'));
// app.use(express.static(__dirname + '/app/components'));
// app.use(express.static(__dirname + '/app/shared'));

app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/public'));
app.use(routes);

var port = process.env.PORT || 8080; 
console.log('listening on ' + port);
app.listen(port);
