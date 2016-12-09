var express = require('express');
var router = express.Router();
var request = require('request');

router.get('/', function(req,res){
	res.sendFile(__dirname + '/public/index.html');
});
router.get('/register', function(req,res){
	res.sendFile(__dirname + '/public/add.html');
});


router.get('/view', function(req,res){
	var url = 'http://localhost:8888/viewUser/?id='+req.query.id;
	request.get(url, function(err, response, body) {
        if (!err && response.statusCode == 200) {
            var locals = JSON.parse(body);
            res.render(__dirname + '/public/profile.html', locals);
        }
    });
});

module.exports = router;