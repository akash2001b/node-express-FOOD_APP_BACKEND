const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Favorites = require('../models/favorite');
const authenticate=require('../authenticate');
const cors = require('./cors');
const favoriteRouter = express.Router();

favoriteRouter.use(bodyParser.json());



favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser, (req,res, next) =>{

    Favorites.find({ user: req.user._id})
    .populate('user')
    .populate('dishes')
    .then( (item) =>{
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(item);
    }, (err) => next(err))
    .catch( (err) => next(err));

})
.post( cors.corsWithOptions,authenticate.verifyUser, (req,res, next)=>{

    Favorites.find({ user: req.user._id})
    .then( (favorite) =>{      

        if(favorite.length!=0){         
                   
            req.body.forEach( (dishes) =>{
                // push dish if not present
                if(!favorite[0].dishes.includes(dishes._id))
                    favorite[0].dishes.push(dishes);
                else
                console.log('dish alredy present.........');
            });    

            favorite[0].save()
            .then( dish =>{
                res.statusCode=200;
                res.setHeader('Content-Type','applicaton/json');
                res.json(favorite[0]);
            } );
        }
        else{
            console.log("Couldn't find the user........");
            Favorites.create({ user:req.user._id})
            .then( (favorite) =>{
                req.body.forEach( (dishes) =>{
                    favorite.dishes.push(dishes);
                });
                favorite.save()
                .then( dish =>{
                    console.log(dish);
                    res.statusCode=200;
                    res.setHeader('Content-Type','applicaton/json');
                    res.json(favorite);
                } );
            })
            .catch( err => next(err));
        }

    })
    .catch( err => next(err));

})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next)=> {
    res.statusCode = 403;
    res.end('PUT operation is not supported on /favourites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res, next)=>{

    console.log('deleting data of the user....');
    Favorites.remove({ user: req.user._id})
    .then( (resp) =>{

        console.log(resp);
        res.statusCode=200;
        res.setHeader('Content-Type','applicaton/json');
        res.json(resp);
        
    }, (err) => next(err))
    .catch( err => next(err));


});



// with dishId
favoriteRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res, next)=>{

    Favorites.find({ user: req.user._id})
    .then( (favorite) =>{
        console.log('favorite is',favorite)
        if(favorite.length!=0){            
            if(!favorite[0].dishes.includes(req.params.dishId))
                favorite[0].dishes.push({ _id:req.params.dishId});
            
            favorite[0].save()
            .then( dish =>{
                res.statusCode=200;
                res.setHeader('Content-Type','applicaton/json');
                res.json(favorite[0]);
            } );
        }       

    })
    .catch( err => next(err));


})
.delete( cors.corsWithOptions,authenticate.verifyUser, (req,res, next)=>{
    Favorites.find({ user: req.user._id})
    .then( (favorite) =>{

        //revmoing the dishid
        favorite[0].dishes=favorite[0].dishes.filter( (item)=>{
            return item!=req.params.dishId
        });
        favorite[0].save()
            .then( dish =>{
                res.statusCode=200;
                res.setHeader('Content-Type','applicaton/json');
                res.json(favorite[0]);
            } );
        
    }, (err) => next(err))
    .catch( err => next(err));
});


module.exports=favoriteRouter;