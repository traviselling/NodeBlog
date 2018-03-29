var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/images' })
var mongo = require('mongodb');
var db = require('monk')('localhost/scApp');


router.get('/', function(req, res, next) {
	var db = req.db;
	var projects = db.get('projects');
	projects.find({}, {limit:6}, function(err, projects){
		res.render('RecentProjects/index', { projects: projects });
	});
});

router.get('/show/:id', function(req, res, next) {
	var posts = db.get('projects');

	posts.findById(req.params.id,function(err, post){
		res.render('RecentProjects/show',{
  			'post': post
  		});
	});
});
// router.get('/show/:id', function(req, res, next) {
// 	var projects = db.get('projects');
//
// 	projects.findById(req.params.id,function(err, projects){
// 		res.render('recentProjects/show',{
//   			'projects': projects
//   		});
// 	});
// });

module.exports = router;
