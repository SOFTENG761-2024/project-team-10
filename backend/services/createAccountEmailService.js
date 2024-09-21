const nodemailer = require('nodemailer');

async function sendBusinessAccountVerifiedEmail(to, password) {
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
        html: `<p>Congratulations, the Fellows platform has approved your request to create a business user. </p></b>
        <p>Your initial password is: ${password}</p>
        <p>You can sign in with this <a href="${process.env.FRONT_END_BASE_URL + '/signin'}">link</a>,</p>
        <p>or change your passowrd with this <a href="${process.env.FRONT_END_BASE_URL + '/profile-setting'}">link</a>.</p>` // html body (optional)
    };
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = {
    sendBusinessAccountVerifiedEmail
};