var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session=require('express-session');
const FileStore=require('session-file-store')(session);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const dishRouter=require('./routes/dishRouter');
const promoRouter=require('./routes/promoRouter');
const leaderRouter=require('./routes/leaderRouter');


const mongoose=require('mongoose');
const Dishes=require('./models/dishes');

const url='mongodb://localhost:27017/conFusion';

const connect=mongoose.connect(url);


connect.then((db) =>{
  console.log('Connectd correctly to the server..');
}, (err) => console.log(err));

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser('12345-67890-12345-67890'));
app.use(session({
  name:'session-id',
  secret:'12345-67890-12345-67890',
  saveUninitialized:false,
  resave:false,
  store:new FileStore()
}));


// app.use(function(req, res, next) {
//     console.log('STARTING 123..........................');
//     next();
// });
// testing


app.use('/', indexRouter);
app.use('/users', usersRouter);

// authentication

function auth(req,res,next){
  console.log('session details are............')
  console.log(req.session);

  if(!req.session.user){
      console.log('not authenticated.........');
      let err= new Error('you are not authenticated');
      err.status=401;
      return next(err);   
  }  
  else{
    
    if(req.session.user==='authenticated'){
      console.log('authenticated.........');
      next();
    }
    else{            
      let err= new Error('you are not authenticated');
      err.status=403;
      return next(err);
    }

  }
}

app.use(auth);

// authentication finish


app.use(express.static(path.join(__dirname, 'public')));


app.use('/dishes', dishRouter);
app.use('/promotions', promoRouter);
app.use('/leaders', leaderRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
