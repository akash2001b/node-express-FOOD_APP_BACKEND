let passport=require('passport');
let LocalStrategy=require('passport-local').Strategy;
let User=require('./models/user');
var JwtStrategy=require('passport-jwt').Strategy;
let ExtractJwt=require('passport-jwt').ExtractJwt;
let jwt=require('jsonwebtoken');

var config=require('./config');

exports.local=passport.use( new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// jwt webtoken
exports.getToken= function(user){
    return jwt.sign(user , config.secretKey ,
        { expiresIn: '365d' });
};

let opts={};

opts.jwtFromRequest=ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey=config.secretKey;

exports.jwtPassport=passport.use(new JwtStrategy(opts, (jwt_payload, done) =>{
    console.log('Maintesting.............');
    console.log("JWT payload:" , jwt_payload);
    User.findOne({__id: jwt_payload.sub}, (err, user)=>{
        if(err){
            return done(err,false);
        }
        else if(user){
            return done(null,user);
        }
        else{
            return done(null,false);
        }
    });
}));


exports.verifyUser=passport.authenticate('jwt', {session:false});