const express = require('express');
const mongoose = require('mongoose');
const leadersRouter = express.Router();
const Leaders = require('./../models/leaders')
const bodyParser = require('body-parser');
const { findById } = require('./../models/leaders');


leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
.get((req,res,next)=>{
    Leaders.find({})
    .then((leaders)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json')
        res.json(leaders)
    },(err)=>next(err))
    .catch((err)=>console.log(err))
    })

.post((req,res,next)=>{
    Leaders.create(req.body)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json')
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>console.log(err))

})
.put((req,res,next)=>{
    res.statusCode = 404;
    res.end('Put not supported on /leaders ')
})
.delete((req,res,next)=>{
   Leaders.remove({})
   .then((resp)=>{
    res.statusCode=200;
    res.setHeader('content-type','application/json')
    res.json(resp)
},(err)=>next(err))
.catch((err)=>console.log(err))

})

leadersRouter.route('/:leaderId')

.get((req,res,next)=>{
    Leaders.findById(req.params.leaderId)
    .then((leader)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json')
        res.json(leader)
    },(err)=>next(err))
    .catch((err)=>console.log(err))

})
.post((req,res,next)=>{
    res.statusCode = 404;
    res.end('Post not supported on /leaders/: '+req.params.leaderId)
})
.put((req,res,next)=>{
   Leaders.findByIdAndUpdate(req.params.leaderId,{
       $set:req.body
   },{new:true})
   .then((leader)=>{
    res.statusCode=200;
    res.setHeader('content-type','application/json')
    res.json(leader)
},(err)=>next(err))
.catch((err)=>console.log(err))


})
.delete((req,res,next)=>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('content-type','application/json')
        res.json(resp)
    },(err)=>next(err))
    .catch((err)=>console.log(err))
})
module.exports = leadersRouter;