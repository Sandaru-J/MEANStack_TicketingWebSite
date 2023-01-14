const express=require('express');
const nodemailer = require('nodemailer');

async function sendMail(user,Callback){
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: 'ketchupfoods@gmail.com',
            pass: 'ifkjyscooejutngp',
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let mailOptions = {
        from: "ketchupfoods@gmail.com",
        to: user.email,
        subject: "Ticked Booked",
        html: `<b>Hello ,${user.name} <br>Your order has been placed succesfully.<br>Amount : </b>`
    };
    let info=await transporter.sendMail(mailOptions);
    Callback(info);
}

module.exports=sendMail;