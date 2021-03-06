var express = require('express');
var promoRouter  = express.Router();
const authenticate = require('../authenticate');

const Promotions = require('./../models/promotions');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

promoRouter.use(bodyParser.json())
promoRouter.route('/')

.get((req,res,next)=>{
        Promotions.find({})
        .then((promotions)=>{
                res.statusCode=200,
                res.setHeader('content-type','application/json')
                res.json(promotions)
        },(err)=>next(err))
        .catch((err)=>console.log(err))
})

.post(authenticate.verifyUser,(req, res, next)=>{
                Promotions.create(req.body)
                .then((promotion)=>{       
                        res.statusCode=200,
                        res.setHeader('content-type','application/json')
                        res.json(promotion)
                },(err)=>next(err))
                .catch((err)=>console.log(err))
})
.put(authenticate.verifyUser,(req,res,next)=>{
        res.statusCode=404;
        res.end('Put not supported on  /promotions');
})
.delete(authenticate.verifyUser,function(req, res, next){
        Promotions.remove({})
        .then((resp)=>{
                res.statusCode=200,
                res.setHeader('content-type','application/json')
                res.json(resp)
        },(err)=>next(err))
        .catch((err)=>console.log(err))
});

promoRouter.route('/:promoId')
.get(authenticate.verifyUser,(req,res,next)=>{
        Promotions.findById(req.params.promoId)
        .then((promotion)=>{
                res.statusCode=200,
                res.setHeader('content-type','application/json')
                res.json(promotion)
        },(err)=>next(err))
        .catch((err)=>console.log(err))
})
.post(authenticate.verifyUser,(req,res,next)=>{
        res.statusCode=404;
        res.end('Post operation is not supported on /promotions/:'+req.params.promoId)
})

.put(authenticate.verifyUser,(req, res, next)=>{
        Promotions.findByIdAndUpdate(req.params.promoId,{
                $set:req.body
        },{new:true})
        .then((promotion)=>{
                res.statusCode=200,
                res.setHeader('content-type','application/json')
                res.json(promotion)
        },(err)=>next(err))
        .catch((err)=>console.log(err))
})

.delete(authenticate.verifyUser,function(req, res, next){
        Promotions.findByIdAndRemove(req.params.promoId)
        .then((resp)=>{
                res.statusCode=200,
                res.setHeader('content-type','application/json')
                res.json(resp)
        },(err)=>next(err))
        .catch((err)=>console.log(err))
});

module.exports = promoRouter;