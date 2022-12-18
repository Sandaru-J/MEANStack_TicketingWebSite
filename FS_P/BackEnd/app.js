const express=require('express');

const app=express();

app.use((req,res,next)=>{
    console.log('First Midleware');
    next();
});

app.use((req,res,next)=>{
    res.send('Hello From Express!!!');
});

module.exports = app;