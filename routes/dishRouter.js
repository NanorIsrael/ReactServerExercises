const express = require('express');
 const bodyParser = require('body-parser');
const mongoose =require('mongoose');
const Dishes = require('./../models/dishes');

 const dishRouter= express.Router();

dishRouter.use(bodyParser.json())

  dishRouter.route('/') 
    .get((req,res,next)=>{
        Dishes.find({})
        .then((dishes)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','applicaton/json')
            res.json(dishes);
        },(err)=> next(err))
        .catch((err)=>next(err))
    })
    
    .post((req ,res,next)=>{
        console.log('i have been called',+""+req.body.name)
        Dishes.create(req.body)
        .then((dish)=>{
            console.log('Dish created')
            res.statusCode=200;
            res.setHeader('Content-Type','applicaton/json')
            res.json(dish);
        },(err)=> next(err))
        .catch((err)=>next(err))
    })
    
    .put((req ,res,next)=>{
        res.statusCode = 404;
        res.end('Put operation not supported on /dishes');
    })
    
    .delete ((req ,res,next)=>{
        Dishes.remove({})
        .then((resp)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','applicaton/json')
             res.json(resp);
        },(err)=> next(err))
        .catch((err)=>next(err))                                                                                                                                                                    
    });

dishRouter.route('/:dishId')

.get((req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dish)=>{
    console.log('Dish created')
    res.statusCode=200;
    res.setHeader('Content-Type','applicaton/json')
    res.json(dish);
},(err)=> next(err))
.catch((err)=>next(err))
})

.post((req ,res,next)=>{
    res.statusCode = 404;
    res.end('Post operation not support on  /dishes/:'+req.params.dishId);
})

.put((req ,res,next)=>{
    Dishes.findByIdAndUpdate(req.params.dishId,{
        $set:req.body
    },{new:true})
    .then((dish)=>{
      console.log('Dish created')
      res.statusCode=200;
      res.setHeader('Content-Type','applicaton/json')
      res.json(dish);
  },(err)=> next(err))
  .catch((err)=>next(err))
})

.delete ((req ,res,next)=>{
   Dishes.findByIdAndRemove(req.params.dishId)
   .then((resp)=>{
    res.statusCode=200;
    res.setHeader('Content-Type','applicaton/json')
    res.json(resp);
},(err)=> next(err))
.catch((err)=>next(err))   
})

dishRouter.route('/:dishId/comments')

.get((req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dish)=>{
    if(dish !=null){
        res.statusCode=200;
    res.setHeader('Content-Type','applicaton/json')
    res.json(dish);
    }
    else{
        err = new Error('Dish '+req.params.dishId+ ' not found');
        err.status = 404;
        return next(err);
    }
},(err)=> next(err))
.catch((err)=>next(err))
})

.post((req ,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish !=null){
            console.log(dish.comments)
            dish.comments.push(req.body);
            
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','applicaton/json')
                res.json(dish.comments);
            },(err)=> next(err))
           
        }
        else{
            err = new Error('Dish '+req.params.dishId+ ' not found');
            err.status = 404;
            return next(err);
        }
    },(err)=> next(err))
    .catch((err)=>next(err))   
})

.put((req ,res,next)=>{
    res.statusCode = 403;
    res.end('Put operation not support on  /dishes/:'+req.params.dishId +
    ' /comments');
})

.delete ((req ,res,next)=>{
   Dishes.findById(req.params.dishId)
   .then((resp)=>{
    if(dish !=null){
       for (i=(dish.comments.length-1); i>=0;i--){
        dish.comments.id(dish.comments[i]._id).remove()
       }
        dish.save()
        .then((dish)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','applicaton/json')
            res.json(dish);
        },(err)=> next(err))
       
    }
    else{
        err = new Error('Dish '+req.params.dishId+ ' not found');
        err.status = 404;
        return next(err);
    }
},(err)=> next(err))
.catch((err)=>next(err))   
})

dishRouter.route('/:dishId/comments/:commentsId')

.get((req,res,next)=>{
  Dishes.findById(req.params.dishId)
  .then((dish)=>{
      if(dish != null && dish.comments.id(req.params.commentsId) !=null){
        res.statusCode=200;
    res.setHeader('Content-Type','applicaton/json')
    res.json(dish.comments.id(req.params.commentsId));
      }
    else if(dish == null){
        err = new Error('Dish '+req.params.dishId+ ' not found');
        err.status = 404;
        return next(err);
    }
    else{
        err = new Error('Dish '+req.params.commentsId+ ' not found');
        err.status = 404;
        return next(err);
    }
},(err)=> next(err))
.catch((err)=>next(err))
})

.post((req ,res,next)=>{
    res.statusCode = 404;
    res.end('Post operation not support on  /dishes/:'+req.params.dishId +
    '/comments/ '+req.params.commentsId);
})

.put((req ,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
        if(dish != null && dish.comments.id(req.params.commentsId) !=null){
            if(req.body.rating)
            {
                dish.comments.id(req.params.commentsId).rating = req.body.rating;
            }
            if(req.body.comments)
            {
                dish.comments.id(req.params.commentsId).comments = req.body.comments;
            }
            dish.save()
            .then((dish)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','applicaton/json')
                res.json(dish);
            },(err)=> next(err))
        }
      else if(dish == null){
          err = new Error('Dish '+req.params.dishId+ ' not found');
          err.status = 404;
          return next(err);
      }
      else{
          err = new Error('Dish '+req.params.commentsId+ ' not found');
          err.status = 404;
          return next(err);
      }
  },(err)=> next(err))
  
  .catch((err)=>next(err))
})

.delete ((req ,res,next)=>{
    Dishes.findById(req.params.dishId)
    .then((dish)=>{
    if(dish != null && dish.comments.id(req.params.commentsId) !=null){      
            dish.comments.id(req.params.commentsId).remove();
       
        dish.save()
        .then((dish)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','applicaton/json')
            res.json(dish);
        },(err)=> next(err))
    }
  else if(dish == null){
      err = new Error('Dish '+req.params.dishId+ ' not found');
      err.status = 404;
      return next(err);
  }
  else{
      err = new Error('Dish '+req.params.commentsId+ ' not found');
      err.status = 404;
      return next(err);
  }
},(err)=> next(err))
.catch((err)=>next(err))   
})
module.exports = dishRouter;