'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var routes = require('./routes.js');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public', 'Modules')));

app.use(routes);

var port = process.env.PORT || 8080; 
console.log('listening on 8080');
app.listen(port);