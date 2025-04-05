const nodemailer = require('nodemailer');

    const transporter = nodemailer.createTransport({
      host: process.env.HOST_USER,
      port: process.env.SMTP_PORT,
      secure: true,
      
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    
module.exports = transporter;