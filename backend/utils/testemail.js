require('dotenv').config();
const nodemailer = require('nodemailer');

(async () => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL_USER,
        pass: process.env.SMTP_EMAIL_PASSWORD,
      },
      debug: true, // Show debug output
      logger: true, // Log information to console
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_EMAIL_USER,
      to: 'tableliu@hotmail.com', // send to my email for testing
      subject: 'Test Email',
      text: 'This is a test email sent from Node.js using Nodemailer.',
    });

    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
})();