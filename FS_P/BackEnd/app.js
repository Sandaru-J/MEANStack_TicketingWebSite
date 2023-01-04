const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');

const Event = require('../BackEnd/models/event');

const app=express();

mongoose.connect("mongodb+srv://SiteUser:nAxKdh83uoIeaWFc@cluster0.h9ytvqs.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to database');
})
.catch(()=>{
    console.log('Database Connection Failed')
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });
app.post('/api/event',(req,res,next)=>{
    console.log(req.body);
    const event = new Event({
        title:req.body.title,
        date:req.body.date,
        organization:req.body.organization,
        location:req.body.location,
        capacity:req.body.capacity,
        category:req.body.category,
        TicketC1:req.body.TicketC1,
        TicketP1:req.body.TicketP1,
        TicketQ1:req.body.TicketQ1,
        description:req.body.description
    });
    event.save()
    res.status(201).json({
        message:'Event Addeded Successfully'
    });
});

app.put('/api/event/:id',(req,res,next)=>{
    const event=new Event({
        _id:req.body.id,
        title:req.body.title,
        date:req.body.date,
        organization:req.body.organization,
        location:req.body.location,
        capacity:req.body.capacity,
        category:req.body.category,
        TicketC1:req.body.TicketC1,
        TicketP1:req.body.TicketP1,
        TicketQ1:req.body.TicketQ1,
        description:req.body.description
    })
    Event.updateOne({_id:req.params.id},event).then(result=>{
        console.log(result);
        res.status(200).json({message:'Update Successfull!'});
    });
});

app.get('/api/event',(req,res,next)=>{
    Event.find()
        .then(documents=>{
            console.log(documents);
            res.status(200).json({
                message:'Event Added Sucessfully',
                event:documents
            });
        });
    
});
app.get('/api/event/:id',(req,res,next)=>{
    Event.findOne({_id:req.params.id})
        .then(documents=>{
            console.log(documents);
            res.status(200).json({
                message:'Event Refresdhed Sucessfully',
                event:documents
            });
        });
    
});
app.delete('/api/event/:id',(req,res,next)=>{
    Event.deleteOne({_id:req.params.id}).then(result=>{
        console.log(result);
        res.status(200).json({message:'Post Deleted'});
    }) 
});
module.exports = app; 
//nAxKdh83uoIeaWFc
//mongodb+srv://SiteUser:<password>@cluster0.h9ytvqs.mongodb.net/?retryWrites=true&w=majority