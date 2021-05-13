var express = require('express');
const bodyParser=require('body-parser');
const User=require('../models/user');
var router = express.Router();
const passport=require('passport');
let authenticate=require('../authenticate');
const { urlencoded } = require('express');
const cors=require('./cors');


router.use(bodyParser.json());

/* GET users listing. */
router.get('/', cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin , function(req, res, next) {
  User.find({})
  .then( (users) =>{
    res.statusCode=200;
    res.setHeader('Content-Type','application/json')
    res.json(users);
  });
});

// SignUP user
router.post('/signup', cors.corsWithOptions ,(req,res,next)=>{

  User.register(new User({username: req.body.username}), req.body.password , (err, user) =>{
    if(err){

      console.log("Party 1 ERRor......................");
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json({err:err});
      // error  user exits
    }
    else{
      if(req.body.firstname)  //add firstname and lastname to user
        user.firstname=req.body.firstname;      
      if(req.body.lastname)
        user.lastname=req.body.lastname;    

      user.save()
      .then( (user) =>{
        passport.authenticate('local')(req,res, ()=> {              
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json({ success:true, status:'Registration Successful!'});
        });
      }, (err) => {
        res.statusCode=500;
        res.setHeader('Content-Type','application/json');
        res.json({err:err});
      });
    }
  });
});


// Login User
router.post('/login',cors.corsWithOptions, passport.authenticate('local') ,(req,res,next)=>{

  let token=authenticate.getToken({ _id : req.user._id });

  console.log('the user is',req.user);

  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({ success:true, token: token, status:'You are successfully logged in!'});
  
});



// logout user and clear session details on server and client side
router.get('/logout', cors.corsWithOptions, (req,res,next)=> {

  if(req.user){
    console.log('Inside logout ......')  //testing;
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');

  }
  else{
    console.log('not logged in ...............'); //testing
    let err= new Error(`you are not logged in `);
    err.status=403;
    return next(err);
  }
});


router.get('/facebook/token', passport.authenticate('facebook-token'), (req,res)=>{
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }  
});


module.exports = router;
