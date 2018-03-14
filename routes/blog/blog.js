var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/images' })
var mongo = require('mongodb');
var db = require('monk')('localhost/scApp');


router.get('/about', function(req, res, next){
	res.render('blog/about',{
		title:'About'
	})
});

/* GET home page. */
router.get('/', function(req, res, next) {
	var db = req.db;
	var posts = db.get('articles');
	posts.find({}, {limit:3, sort :{_id: -1}}, function(err, posts){
		res.render('blog/home', { posts: posts });
	});
});




router.get('/show/:id', function(req, res, next) {
	var posts = db.get('articles');

	posts.findById(req.params.id,function(err, post){
		res.render('blog/show',{
  			'post': post
  		});
	});
});

router.get('/add', function(req, res, next) {
	var categories = db.get('categories');

	categories.find({},{},function(err, categories){
		res.render('blog/addpost',{
  			'title': 'Add Post',
  			'categories': categories
  		});
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
		res.render('blog/addpost',{
			"errors": errors
		});
	} else {
		var posts = db.get('articles');
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
				res.redirect('/blog');
			}
		});
	}
});


router.post('/addcomment', function(req, res, next) {
  // Get Form Values
  var name = req.body.name;
  var email= req.body.email;
  var body = req.body.body;
  var postid= req.body.postid;
  var commentdate = new Date();

  	// Form Validation
	req.checkBody('name','Name field is required').notEmpty();
	req.checkBody('email','Email field is required but never displayed').notEmpty();
	req.checkBody('email','Email is not formatted properly').isEmail();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check Errors
	var errors = req.validationErrors();

	if(errors){
		var posts = db.get('articles');
		posts.findById(postid, function(err, post){
			res.render('blog/show',{
				"errors": errors,
				"post": post
			});
		});
	} else {
		var comment = {
			"name": name,
			"email": email,
			"body": body,
			"commentdate": commentdate
		}

		var posts = db.get('articles');

		posts.update({
			"_id": postid
		},{
			$push:{
				"comments": comment
			}
		}, function(err, doc){
			if(err){
				throw err;
			} else {
				req.flash('success', 'Comment Added');
				res.location('/blog/show/'+postid);
				res.redirect('/blog/show/'+postid);
			}
		});
	}
});

module.exports = router;
