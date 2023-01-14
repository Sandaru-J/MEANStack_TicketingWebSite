const express=require('express');
const bodyParser=require('body-parser');
const mongoose = require('mongoose');
const path = require('path')
mongoose.set('strictQuery', false);
const sendMail = require('../BackEnd/sendMail');

const multer= require('multer');

const Event = require('../BackEnd/models/event');

const Booking= require('../BackEnd/models/booking');
const { info } = require('console');

const app=express();

mongoose.connect("mongodb+srv://SiteUser:nAxKdh83uoIeaWFc@cluster0.h9ytvqs.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{
    console.log('Connected to database');
})
.catch(()=>{
    console.log('Database Connection Failed')
});

const MIME_TYPE_MAP={
    'image/png':'png',
    'image/jpeg':'jpg',
    'image/jpg':'jpg'
}
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        const isvalid=MIME_TYPE_MAP[file.mimetype];
        let error = new Error('Invalid mime type');
        if(isvalid){
            error= null;
        }
        cb(error,'./images/');
    },
    filename:(req,file,cb)=>{
        const name= file.originalname.toLowerCase().split('').join('-');
        const ext=MIME_TYPE_MAP[file.mimetype];
        cb(null,Date.now()+'.'+ext);
    }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/images',express.static(path.resolve('./images')))

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
  app.post('/api/booking',(req,res,next)=>{
    console.log(req.body);
    const booking = new Booking({
        name: req.body.name,
        email: req.body.email,
        nic:req.body.nic,
        address:req.body.address,
        telephone:req.body.telephone,
        total:req.body.total,
        eventID:req.body.eventID,
        eventName:req.body.eventName,
        
    });
    booking.save()
    res.status(201).json({
        message:'Booking Addeded Successfully'
    });
});
app.post('/api/event',multer({storage:storage}).single('image'),(req,res,next)=>{
    console.log(req.body);
    const imgUrl="http://localhost:3000/images/"+req.file.filename;
    console.log(imgUrl)
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
        description:req.body.description,
        imagePath:imgUrl
    });
    event.save()
    res.status(201).json({
        message:'Event Addeded Successfully'
    });
});

app.put('/api/event/:id',
    multer({storage:storage}).single('image'),(req,res,next)=>{
     let imagePath=req.body.imagePath;
     if(req.file){
      // const imgUrl="http://localhost:3000/images/"+req.file.filename;
      // imagePath=imgUrl;
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename
     }
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
        description:req.body.description,
        imagePath:imagePath
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
                message:'Event fetched Sucessfully',
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

app.post('/api/sendmail',async (req,res)=>{
    console.log('does it')
    const data=req.body;
    console.log(data)
    await sendMail(data,info => {
        console.log('Message sent');
    });
});


module.exports = app; 
//nAxKdh83uoIeaWFc
//mongodb+srv://SiteUser:<password>@cluster0.h9ytvqs.mongodb.net/?retryWrites=true&w=majority