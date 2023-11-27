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

// const subject = "Reminder to pay credit card payment";
// const text = "Stop being a fool, pay your bill goof ball";

// console.log(__dirname);

// sendReminderEmail(subject, text);


module.exports = sendReminderEmail;


