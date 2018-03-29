var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/images' })
var mongo = require('mongodb');
var db = require('monk')('localhost/scApp');

router.get('/', function(req, res, next) {
	var db = req.db;
	var posts = db.get('posts');
	posts.find({category: "Services"},
  {sort:{title:1}},
  function(err, posts){
		res.render('services',
    { posts: posts,
      title: "Services"
     });
	});
});
module.exports = router;
