const express = require('express');
 const bodyParser = require('body-parser');

 const dishRouter= express.Router();

dishRouter.use(bodyParser.json())

  dishRouter.route('/')
    .all((req , res,next)=>{
        res.statusCode=200;
        res.setHeader('Content-type','text/plain')
        next();
    })
    
    .get((req,res,next)=>{
        res.end('will send all the dishes to you');
        console.log(req)
    })
    
    .post((req ,res,next)=>{
        res.end('Will add the dish:' + req.body.name +'with details:'+ req.body.description);
    })
    
    .put((req ,res,next)=>{
        res.statusCode = 404;
        res.end('Put operation not supported yet');
    })
    
    .delete ((req ,res,next)=>{
        res.end('Deleting all the dishes');                                                                                                                                                                         
    });

dishRouter.route('/:dishId')
.all((req , res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-type','text/plain')
    next();
})
.get((req,res,next)=>{
    res.end(`will send details of the  dish :${req.params.dishId}  to you`);
    // console.log(req.param('id'))
})

.post((req ,res,next)=>{
    res.statusCode = 404;
    res.end('Post operation not support here ');
})

.put((req ,res,next)=>{
    res.write(`updating the dish : ${req.params.dishId}`);
    res.end(` will update the dish: ${req.body.name} with details: ${req.body.description}`);
})

.delete ((req ,res,next)=>{
    res.end(`Deleting the dishes:${req.params.dishId}`);
})

module.exports = dishRouter;