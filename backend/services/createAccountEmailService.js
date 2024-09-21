const nodemailer = require('nodemailer');

async function sendBusinessAccountVerifiedEmail(to) {
    // SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL_USER,
            pass: process.env.SMTP_EMAIL_PASSWORD,
        }
    });

    // Setup email data
    let mailOptions = {
        from: '"Fellows" <your-email@gmail.com>', // sender address
        to: to, // list of receivers
        subject: 'Account Verified by Fellows', // Subject line
        // text: text,
        html: `<p>Congratulations, the Fellows website has approved your request to create a business user. </p></b><p>Please click this <a href="${process.env.FRONT_END_BASE_URL + '/profile-setting'}">link</a> to set up your account.</p>` // html body (optional)
    };
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = {
    sendBusinessAccountVerifiedEmail
};