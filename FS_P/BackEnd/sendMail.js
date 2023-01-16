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
        subject: "Tickets Booked for "+user.eventName,
        html: `<b>Hello ,${user.name} <br>Your Booking has been placed succesfully for ${user.eventName}.<br>
        Your Booking ID is ${user.eventId} <br>Amount : ${user.total}</b>`
    };
    let info=await transporter.sendMail(mailOptions);
    Callback(info);
}

module.exports=sendMail;