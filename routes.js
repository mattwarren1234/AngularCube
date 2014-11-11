'use strict';
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

router.get('/api', function(req, res){
	res.json({message : 'hey world!'});
});

module.exports = router;
