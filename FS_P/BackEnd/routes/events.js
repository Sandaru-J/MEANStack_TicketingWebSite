const express= require('express');
const Event=require('../models/event');
const router= express.Router();

router.post('/api/event',(req,res,next)=>{

    const event = new Event({
        title:req.body.title,
        date:req.body.date
    });
    console.log(event);
    event.save()
    res.status(201).json({
        message:'Event Addeded Successfully'
    });
});

router.put('/api/event/:id',(req,res,next)=>{
    const event=new Event({
        _id:req.body.id,
        title:req.body.title,
        date:req.body.date
    })
    Event.updateOne({_id:req.params.id},event).then(result=>{
        console.log(result);
        res.status(200).json({message:'Update Successfull!'});
    });
});

router.get('/api/event',(req,res,next)=>{
    Event.find()
        .then(documents=>{
            console.log(documents);
            res.status(200).json({
                message:'Event Added Sucessfully',
                event:documents
            });
        });
    
});

router.delete('/api/event/:id',(req,res,next)=>{
    Event.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({message:'Post Deleted'});
    }) 
});
module.exports = router;