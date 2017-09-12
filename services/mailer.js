const nodemailer = require('nodemailer');

const config = require('../config');

const transConfig = {
  host: config.smtp.host,
  port: config.smtp.port,
  secure: false,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.password
  }
};

const sendMail = data => {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport(transConfig);

    let mailOptions = {
      from: `"Danny Suarez 👻" <${config.smtp.user}>`,
      to: 'danny.suarez@alkimiaconsultores.com',
      subject: 'Hello from Node.Js ✔',
      html: `<h1>${data}</1>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        return reject({ message: 'unable to send mail.', error });
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      resolve({ message: 'mail sended successfull.' });
    });
  });
};

module.exports = { sendMail };
