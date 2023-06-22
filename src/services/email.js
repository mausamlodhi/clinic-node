import config from '../config/index';

const { email } = config;

export default {
    sendOtp(data) {
        try{
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'setbug56@gmail.com',
                pass: 'hwmooeyqgxpgdhtw'
            },
            connectionTimeout: 50000,
        });

        var mailOptions = {
            from: email.emailAddress,
            to: email.to,
            subject: 'Your OTP',
            text: 'Your Otp ' + data.token
        };
        console.log("........................inside send otp")
        return transporter.sendMail(mailOptions);
    }
    catch(error){
        console.log(error);
    }
    },

}