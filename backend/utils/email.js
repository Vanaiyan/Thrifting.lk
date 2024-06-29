const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "39b7a50f66bb7d",
      pass: "a0577e3af365be"
    }
  });


  const message = {
    from: '"vanai" <vanaiyan@gmail.com>',
    to: options.to,
    subject: options.subject,
    text: options.text,
  };

  await transport.sendMail(message);
};

module.exports = sendEmail;
