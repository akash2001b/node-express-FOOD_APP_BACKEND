const express=require('express');
const bodyParser=require('body-parser');

const mongoose=require('mongoose');
const Dishes=require('../models/dishes');


const dishRouter=express.Router();

dishRouter.use(bodyParser.json());


dishRouter.route('/')
.get( (req,res,next)=>{

    console.log(1);
    console.log('the request url is',req.url);
    
    Dishes.find({}).then( (dishes) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(dishes);
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.post( (req,res,next)=>{
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
.put( (req,res,next)=>{
    console.log(2);
    res.statusCode=403;
    res.end('PUT operation not supported on' + req.url); 

})
.delete( (req,res,next)=>{    
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
    .then( (dish) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(dish);
    }, (err) => next(err) )
    .catch( (err) => next(err) );

})
.post( (req,res,next)=>{

    // console.log('2..............................');
    console.log(69);
    res.statusCode=403;
    res.end('POST operation not supported on /dishes/' +req.params.dishId); 

})
.put( (req,res,next)=>{

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
.delete( (req,res,next)=>{ 
    
    console.log('3..............................');

    Dishes.findByIdAndRemove(req.params.dishId)
    .then( (resp) => {
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(resp);        
    }, (err) => next(err))
    .catch( (err) => next(err));

});



module.exports=dishRouter;