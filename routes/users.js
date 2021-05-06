var express = require('express');
const bodyParser=require('body-parser');
const User=require('../models/user');
var router = express.Router();



router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// SignUP user
router.post('/signup',(req,res,next)=>{

  User.findOne({username: req.body.username})
  .then((user) => {
    if(user!= null){
      var err=new Error('User'+ req.body.username+'already exitsts');
      err.status=403;
      next(err);
      // error  user exits
    }
    else{
      //creaet user
      return User.create({
        username:req.body.username,
        password:req.body.password
      });
    }
  })
  .then((user)=>{

    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({status:'Registration Successful!', user: user});

  }, (err) => next(err) )
  .catch( (err) => next(err) );

});

// Login User
router.post('/login',(req,res,next)=>{

  if(!req.session.user){

    let authHeader=req.headers.authorization;
    
    if(!authHeader){
      console.log('Inseide false function...............111');    
      console.log('SENDING RESPONONSE BACK');    
      let err= new Error('you are not authenticated');
      res.setHeader('WWW-Authenticate','Basic');
      err.status=401;
      return next(err);
    }
  
    let auth=new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
  
    var username=auth[0];
    var password=auth[1];
    
    // Search user from Database
    User.findOne({username: username})
    .then( (user) =>{

      if(user === null){

        let err= new Error(`User ${username} does not exists`);
        err.status=403;
        return next(err);

      }
      else if (user.password!==password){
        let err= new Error(`Your password is incorrect`);
        err.status=403;
        return next(err);

      }
      else if(user.username === username && user.password===password){
        req.session.user='authenticated';  //setup session
        res.statusCode=200;
        res.setHeader('Content-Type','text/plain');
        res.end('You are authenticated!');
      }
    })
    .catch( (err) => next(err));     
  }
  else{
    res.statusCode=200;
    res.setHeader('Content-Type','text/plain');
    res.end('You are already are authenticated!');
  }
});


// logout user and clear session details on server and client side
router.get('/logout', (req,res,next)=> {

  if(req.session.user){
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





module.exports = router;
