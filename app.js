var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

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
app.use(cookieParser());


// authentication

function auth(req,res,next){
  console.log('requrest headers is............')
  console.log(req.headers);
  
  let authHeader=req.headers.authorization;
  
  if(!authHeader){
    console.log('Inseide false function...............111');    
    console.log('SENDING RESPONONSE BACK');    
    let err= new Error('you are not authenticated');
    res.setHeader('WWW-Authenticate','Basic');
    err.status=401;
    return next(err);
  }

  let auth=new Buffer(authHeader.split(' ')[1],'base64').toString().split(':');

  var username=auth[0];
  var password=auth[1];

  if(username==='admin' && password==='password'){

    console.log('PARTY......................');
    next();
  }
  else{
    console.log('PARTY. WTIH WORING CREDENTIONAL.....................');
    let err= new Error('you are not authenticated');
    res.setHeader('WWW-Authenticate','Basic');
    err.status=401;
    return next(err);
  }
}

app.use(auth);

// authentication finish


app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
