const express = require('express');
const router = require("express").Router();
const nodemailer = require('nodemailer');

//Create
router.post("/api/email/otp", async (req, res) => {
    const { email, otp } = req.body;
    
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass,
        },
    });

    let message = {
        from: "Ignition@gmail.com",
        to: email,
        subject: "Ignition OTP",
        text: "Your OTP password is: " + otp,
        html: "<b>Your OTP password is: "+otp+"</b>",
    }

    transporter.sendMail(message).then((info) => {
        res.status(200).json({
            msg: "Email Sent!",
            preview: nodemailer.getTestMessageUrl(info)
        });
    }).catch(error => {
        return res.status(500).json({error});
    });
});

module.exports = router;