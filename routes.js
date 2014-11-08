var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index.html');
});

router.get('/api', function(req, res){
	res.json({message : 'hey world!'});
});

module.exports = router;
