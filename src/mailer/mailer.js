
import mailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';
import dotenv from 'dotenv';

const transporter = mailer.createTransport(smtpTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    auth: {
        user: 'habinezajan@gmail.com',
        pass: 'janvier1998'
    },
    tls:{
        rejectUnauthorized: false
    }
}));

module.exports = transporter;