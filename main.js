const sendReminderEmail = require('./email');
const finance = require('./finance')
// const cron = require('node-cron');


async function main() {
    // const text = "Stop being a fool, pay your bill goof ball";
    const text = await finance();
    if (text === '') {
        text = await finance();
    }
    const subject = "Reminder to pay credit card payment";

    sendReminderEmail(subject, text);
}

// cron.schedule('* * * * *', () => {
    main(); 
// });

