const express=require('express');
const bodyParser=require('body-parser');

const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/api/event',(req,res,next)=>{
    const event=req.body;
    console.log(event);
    res.status(201).json({
        message:'Event Addeded Successfully'
    });
});
app.use((req,res,next) =>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });

app.use('/api/event',(req,res,next)=>{
    const event=[
        {
            id:'sdffas',
            title:'Interflash',
            date:'2022/12/12'
        },
        {
            id:'sdsa',
            title:'Unmadi',
            date:'Form server'
        }
    ];
    res.status(200).json({
        message:'Event Added sucessfully',
        event:event
    });
});

module.exports = app; 