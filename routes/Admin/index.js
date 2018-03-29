var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/images' })
var mongo = require('mongodb');
var db = require('monk')('localhost/scApp');

router.get('/', function(req, res, next){
	res.render('Admin/index',{
		title:'Admin'
	});
});
router.get('/add', function(req, res, next){
	res.render('Admin/addPost',{
		title:'Add Posts'
	});
});
router.get('/addproject', function(req, res, next){
	res.render('Admin/addProject',{
		title:'Add Projects'
	});
});

router.post('/add', upload.single('mainimage'), function(req, res, next) {
  // Get Form Values
  var title = req.body.title;
  var category= req.body.category;
  var body = req.body.body;
  var author = req.body.author;
  var date = new Date();

  // Check Image Upload
  if(req.file){
  	var mainimage = req.file.filename
  } else {
  	var mainimage = 'noimage.jpg';
  }

  	// Form Validation
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check Errors
	var errors = req.validationErrors();

	if(errors){
		res.render('error',{
			"errors": errors
		});
	} else {
		var posts = db.get('posts');
		posts.insert({
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"author": author,
			"mainimage": mainimage
		}, function(err, post){
			if(err){
				res.send(err);
			} else {
				req.flash('success','Post Added');
				res.location('/');
				res.redirect('/');
			}
		});
	}
});

router.post('/addproject', upload.single('mainimage'), function(req, res, next) {
  // Get Form Values
  var title = req.body.title;
  var category= req.body.category;
  var body = req.body.body;
  var date = req.body.projectDate;

  // Check Image Upload
  if(req.file){
  	var mainimage = req.file.filename
  } else {
  	var mainimage = 'noimage.jpg';
  }

  	// Form Validation
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check Errors
	var errors = req.validationErrors();

	if(errors){
		res.render('error',{
			"errors": errors
		});
	} else {
		var projects = db.get('projects');
		projects.insert({
			"title": title,
			"body": body,
			"category": category,
			"date": date,
			"mainimage": mainimage
		}, function(err, projects){
			if(err){
				res.send(err);
			} else {
				req.flash('success','Project Added');
				console.log("Project Added!");
				res.location('/');
				res.redirect('/');
			}
		});
	}
});
module.exports = router;
