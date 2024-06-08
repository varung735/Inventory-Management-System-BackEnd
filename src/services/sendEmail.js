const mailTransporter = require('../config/mailTransporter.config');
const config = require('../config/enviornment.config');

/*
options: {
    to: example@mail.com,
    subject: "Subject",
    text: "text"
}
*/
const sendMail = async (options) => {
    const message = {
        from: config.stmp_username,
        to: options.email,
        subject: options.subject,
        text: options.text
    };

    await mailTransporter.sendMail(message);
}

module.exports = sendMail;