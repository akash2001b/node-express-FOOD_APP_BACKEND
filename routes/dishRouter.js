const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const Dishes=require('../models/dishes');
const authenticate=require('../authenticate');


const dishRouter=express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.get( (req,res,next)=>{

    console.log(1);
    console.log('the request url is',req.url);
    
    Dishes.find({})
    .populate('comments.author')
    .then( (dishes) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(dishes);
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.post( authenticate.verifyUser, (req,res,next)=>{
    console.log('post method........');
    Dishes.create(req.body)
    .then( (dish) => {
        console.log('Dish created', dish);
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(dish);       
    }, (err) => next(err))
    .catch( (err) => next(err) );

})
.put(authenticate.verifyUser, (req,res,next)=>{
    console.log(2);
    res.statusCode=403;
    res.end('PUT operation not supported on' + req.url); 

})
.delete( authenticate.verifyUser,  (req,res,next)=>{    
    console.log('remongin all dishes:');
    Dishes.remove({})
    .then( (resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(resp);
        
    }, (err) => next(err))
    .catch( (err) => next(err));

});




// Dish id
dishRouter.route('/:dishId').
get( (req,res,next)=>{

    console.log('1..............................');

    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then( (dish) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(dish);
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.post( authenticate.verifyUser, (req,res,next)=>{

    // console.log('2..............................');
    console.log(69);
    res.statusCode=403;
    res.end('POST operation not supported on /dishes/' +req.params.dishId); 

})
.put( authenticate.verifyUser, (req,res,next)=>{

    console.log('2..............................');

    Dishes.findByIdAndUpdate(req.params.dishId,{
        $set:req.body
    }, {new : true})
    .then( (dish) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(dish);
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.delete( authenticate.verifyUser,(req,res,next)=>{ 
    
    console.log('3..............................');

    Dishes.findByIdAndRemove(req.params.dishId)
    .then( (resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(resp);        
    }, (err) => next(err))
    .catch( (err) => next(err));

});




// --------------------------------------------------------------------------------------

// comments and comment id


dishRouter.route('/:dishId/comments')
.get( (req,res,next)=>{

    console.log(1);
    console.log('the request url is',req.url);
    
    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then( (dish) =>{
        if(dish !=null){       
            res.statusCode=200;
            res.setHeader('Content-Type','applicaton/json');
            res.json(dish.comments);
        }else{
            err=new Error(`Dish ${ req.params.dishId} not found`);
            err.status=404;
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.post( authenticate.verifyUser, (req,res,next)=>{
    console.log('post method comments........');
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if(dish !=null){
                   
            req.body.author=req.user._id;    
            dish.comments.push(req.body);
            dish.save()
            .then( (dish) => {

                Dishes.findById(dish._id)  //checkhere
                .populate('comments.author')
                .then( (dish) =>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','applicaton/json');
                    res.json(dish.comments);                    
                });
            }, err => next(err));
        }else{
            err=new Error(`Dish ${ req.params.dishId} not found`);
            err.status=404;
            return next(err);
        }    
    }, (err) => next(err))
    .catch( (err) => next(err) );

})
.put( authenticate.verifyUser,(req,res,next)=>{
    console.log(2);
    res.statusCode=403;
    res.end('PUT operation not supported on /dishes/' + req.params.dishId+'/comments'); 

})
.delete( authenticate.verifyUser ,(req,res,next)=>{    
    console.log('remongin all dishes:');
    
    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if(dish !=null){                  
            // dish.comments=[]; // see this part how to delete comments
            
            for(let i=(dish.comments.length-1); i>=0 ; i--){
                dish.comments.id(dish.comments[i].id).remove();
                // console.log(dish.comments[0].id);
            }

            dish.save()
            .then( (dish) => {
                res.statusCode=200;
                res.setHeader('Content-Type','applicaton/json');
                res.json(dish.comments);
            }, err => next(err));
        }else{
            err=new Error(`Dish ${ req.params.dishId} not found`);
            err.status=404;
            return next(err);
        }           
    }, (err) => next(err))
    .catch( (err) => next(err));

});




// comment id


dishRouter.route('/:dishId/comments/:commentId').
get( (req,res,next)=>{

    console.log('1..............................');

    Dishes.findById(req.params.dishId)
    .populate('comments.author')
    .then( (dish) =>{
        if(dish !=null && dish.comments.id(req.params.commentId) != null ){       
            res.statusCode=200;
            res.setHeader('Content-Type','applicaton/json');
            console.log('the commment is', dish.comments.id(req.params.commentId).comment); // this is testing
            res.json(dish.comments.id(req.params.commentId) );
        }
        else if(dish== null){
            err=new Error(`Dish ${ req.params.dishId} not found`);
            err.status=404;
            return next(err);
        }
        else{
            err=new Error(`comment ${ req.params.commentId} not found`);
            err.status=404;
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.post( authenticate.verifyUser, (req,res,next)=>{

    // console.log('2..............................');
    console.log(69);
    res.statusCode=403;
    res.end('POST operation not supported on /comments/' +req.params.commentId); 

})
.put( authenticate.verifyUser, (req,res,next)=>{

    console.log('2..............................');

    Dishes.findById(req.params.dishId)
    .then( (dish) =>{
        if(dish !=null && dish.comments.id(req.params.commentId) != null ){  
            if(req.body.rating){
                dish.comments.id(req.params.commentId).rating=req.body.rating;
            }
            if(req.body.comment){
                dish.comments.id(req.params.commentId).comment=req.body.comment;
            }
            console.log('the updated comments is',dish.comments.id(req.params.commentId));//testing on console
                        
            dish.save()
            .then( (dish) => {
                Dishes.findById(dish._id)  //checkhere
                .populate('comments.author')
                .then( (dish)=>{
                    res.statusCode=200;
                    console.log('1...........COMMENT UPDATED');
                    res.setHeader('Content-Type','applicaton/json');
                    res.json(dish);
                });

            }, err => next(err));            
        }
        else if(dish== null){
            err=new Error(`Dish ${ req.params.dishId} not found`);
            err.status=404;
            return next(err);
        }
        else{
            err=new Error(`comment ${ req.params.commentId} not found`);
            err.status=404;
            return next(err);
        }
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.delete( authenticate.verifyUser, (req,res,next)=>{     
    console.log('3..............................');

    Dishes.findById(req.params.dishId)
    .then( (dish) => {
        if(dish !=null && dish.comments.id(req.params.commentId) != null ){                
            
            dish.comments.id(req.params.commentId).remove();
                
            dish.save()
            .then( (dish) => {

                Dishes.findById(dish._id)  //checkhere
                .populate('comments.author')
                .then( (dish)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type','applicaton/json');
                    res.json(dish.comments);
                });                
            }, err => next(err));
        }
        else if(dish== null){
            err=new Error(`Dish ${ req.params.dishId} not found`);
            err.status=404;
            return next(err);
        }
        else{
            err=new Error(`comment ${ req.params.commentId} not found`);
            err.status=404;
            return next(err);
        }          
    }, (err) => next(err))
    .catch( (err) => next(err));

});



module.exports=dishRouter;