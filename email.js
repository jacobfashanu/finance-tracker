const nodemailer = require('nodemailer');
require('dotenv').config();

const emailAddress = "fashanujacob@gmail.com";
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailAddress,
      pass: emailPassword
    }
});

function sendReminderEmail (subject, text) {
    const message = {
        from: emailAddress,
        to: emailAddress,
        subject: subject,
        text: text
    }

    transporter.sendMail(message, function (err, info) {
        if (err) {
          console.log(err)
        } else {
          console.log(info);
        }
    });
}


module.exports = sendReminderEmail;


