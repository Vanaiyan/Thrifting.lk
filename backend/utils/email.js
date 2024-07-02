// const nodemailer = require("nodemailer");
// require("dotenv").config();

// const sendEmail = async (options) => {
//   const transport = nodemailer.createTransport({
//     host: "sandbox.smtp.mailtrap.io",
//     port: 2525,
//     auth: {
//       user: process.env.SMTP_USER,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   const message = {
//     from: '"vanai" <vanaiyan@gmail.com>',
//     to: options.to,
//     subject: options.subject,
//     text: options.text,
//   };

//   await transport.sendMail(message);
// };

// module.exports = sendEmail;




const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (options) => {
  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`,
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transport.sendMail(message);
};

module.exports = sendEmail;

