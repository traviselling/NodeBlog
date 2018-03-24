var express = require('express');
var router = express.Router();
var multer = require('multer');
var upload = multer({ dest: './public/images' })
var mongo = require('mongodb');
var db = require('monk')('localhost/test');

router.get('/', function(req, res, next){
	res.render('TextEditor/index',{
		title:'Text Editor'
	})
});

// router.post('/', function(req, res){
//   console.log(req.body.title  + req.body.category + req.body.body);
// 	res.render('/thankyou');
// });
router.post('/action', function(req, res, next){
	console.log("I am here!");
	var things = db.get('posts');
	things.find({}, {}, function(err, things){
		res.render('TextEditor/action', { things: things });
		console.log('Now I am here!');
		res.redirect('/');
	});

});


router.post('/', upload.single('mainimage'), function(req, res, next) {
  // Get Form Values
  var title = req.body.title;
  var category= req.body.category;
  var body = req.body.body;
  var author = req.body.author;
	var tags =req.body.tags;
  var date = new Date();
  // Check Image Upload
  if(req.file){
  	var mainimage = req.file.filename
		console.log('image loaded!');
  } else {
		console.log('no image loaded!');
  	var mainimage = 'noimage.jpg';
  }

  	// Form Validation
	req.checkBody('title','Title field is required').notEmpty();
	req.checkBody('body', 'Body field is required').notEmpty();

	// Check Errors
	var errors = req.validationErrors();

	if(errors){
		res.render('/TextEditor/action',{
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
				res.location('/texteditor');
				res.redirect('/texteditor');
			}
		});
	}
});




module.exports = router;
