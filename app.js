var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });
var expressValidator = require('express-validator');
var pug = require('pug');

var nodemailer = require('nodemailer');


var mongo = require('mongodb');
var db = require('monk')('127.0.0.1/scApp');

var routes = require('./routes/index');
var posts = require('./routes/posts');
var categories = require('./routes/categories');
var apps = require('./routes/apps');
var services = require('./routes/services');
var about = require('./routes/about');
var contact = require('./routes/contact');
var test = require('./routes/test');
var blog = require('./routes/blog/blog');
var admin = require('./routes/Admin/index');
var textEditor = require('./routes/TextEditor/index');
var recentProjects = require('./routes/RecentProjects/index');


var app = express();

app.locals.moment = require('moment');

app.locals.truncateText = function(text, length){
  var truncatedText = text.substring(0, length);
  return truncatedText;
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));



// Connect-Flash
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use('/', routes);
app.use('/posts', posts);
app.use('/categories', categories);
app.use('/apps',apps);
app.use('/services',services);
app.use('/about',about);
app.use('/contact',contact);
app.use('/test', test);
app.use('/blog', blog);
app.use('/admin', admin);
app.use('/texteditor',textEditor);
app.use('/recentprojects', recentProjects);

// Node Mailer

app.post('/contact', function (req, res) {
  var mailOpts, smtpTrans;
  //Setup Nodemailer transport
  smtpTrans = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: "smartycatdesigns@gmail.com",
          pass: "matraca1223"
      }
  });
  //Mail options
  mailOpts = {
      from: "Smarty Cat Admin", //grab form data from the request body object
      to: 'twfljeb@gmail.com',
      subject: 'Website contact form',
      html: "<p>Name: " + req.body.name +
      "</p> <p>Email Address: " + req.body.from +
      "</p><p>The Dialogue: " + req.body.body + "</p>"
  };
  mailOptsRelay = {
    from: "Smarty Cat Admin",
    to: req.body.from,
    subject:"Inquiry Received",
    html: "Thank you for contacting us at Smarty Cat Designs. We will be addressing your inquiry shortly. Until then please have a look around our site and see what else interests you."
  };
  smtpTrans.sendMail(mailOpts, function (error, response) {
      //Email not sent
      if (error) {
          console.log("The Mail Did Not Send!!!");
      }
      //Yay!! Email sent
      else {
          console.log("Mail Sent!!!");
          res.render('thankyou');
      }
  });
  smtpTrans.sendMail(mailOptsRelay, function (error, response) {
      //Email not sent
      if (error) {
          console.log("The Relay Mail Did Not Send!!!");
      }
      //Yay!! Email sent
      else {
          console.log(" Relay Mail Sent!!!");

      }
  });
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
