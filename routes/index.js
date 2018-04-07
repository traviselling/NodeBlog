var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', ensureAuthenticated, function(req, res, next) {
//   res.render('../index', { title: 'Home' });
// });
//
// function ensureAuthenticated(req, res, next){
// 	if(req.isAuthenticated()){
//     res.redirect('/admin');
// 		return next();
// 	}
// 	res.redirect('/');
// }
router.get('/', function(req, res, next){
  res.render('index',{
    title: 'Home'
  });
});
module.exports = router;
