const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "afba4f252f7379",
      pass: "f68dc0190649e5"
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
