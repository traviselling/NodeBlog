var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/scApp');


router.get('/', function(req, res, next){
	res.render('TextEditor/index',{
		title:'Text Editor'
	})
});


module.exports = router;
