const express=require('express');
const bodyParser=require('body-parser');


const dishRouter=express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.all( (req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','text/html');
    console.log(1);
    next();
})
.get( (req,res,next)=>{
    console.log(2);
    res.end('Will send all promotions to you !');
})
.post( (req,res,next)=>{
    console.log(2);
    res.end('will add the promotions: '+ req.body.name+'with details:' 
    +req.body.description); 
})
.put( (req,res,next)=>{
    console.log(2);
    res.statusCode=403;
    res.end('PUT operation not supported on' + req.url); 
})
.delete( (req,res,next)=>{
    console.log(2);
    res.end('Deleting all the request');
});




// Dish id
dishRouter.route('/:promoId').
get( (req,res,next)=>{
    console.log(69);
    res.end('Will send details of the promotion: ' + req.params.promoId+ ' to you!  ');
})
.post( (req,res,next)=>{
    console.log(69);
    res.end('POST operation not supported on /promotions/' +req.params.promoId); 
})
.put( (req,res,next)=>{
    console.log(69);
    res.write('Updating the promotion:'+req.params.promoId +'\n');
    res.end('Will update the promotion'+ req.body.name+'with details'+ req.body.description); 
})
.delete( (req,res,next)=>{    
    res.end('Deleting dish:'+ req.params.promoId);
});



module.exports=dishRouter;