const express = require('express');

const leadersRouter = express.Router();

const bodyParser = require('body-parser');


leadersRouter.use(bodyParser.json());

leadersRouter.route('/')
.all((req,res,next)=>{
    res.statusCode=200                      
    res.setHeader('Content-type','text/plain')
    next();
})
.get((req,res,next)=>{
    res.end('Information on all leaders will be sent to you')
})
.post((req,res,next)=>{
    res.end(`You have added leader ${req.body.name}`)
})
.put((req,res,next)=>{
    res.statusCode = 404;
    res.end('Not found ')
})
.delete((req,res,next)=>{
    res.end(`you are have deleted leader` );
})

leadersRouter.route('/:leaderId')
.all((req,res,next)=>{
    res.statusCode=200
    res.setHeader('Content-type','text/plain')
    next();
})
.get((req,res,next)=>{
    res.end('you have selected leader : '+ req.params.leaderId)
})
.post((req,res,next)=>{
    res.statusCode = 404;
    res.end('Not found ')
})
.put((req,res,next)=>{
    res.end(`You have updated leader ${req.params.leaderId} info succesfully`)

})
.delete((req,res,next)=>{
    res.end(`you are removed leader ${req.params.leaderId}` );
})
module.exports = leadersRouter;