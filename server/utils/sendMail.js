const nodemailer = require("nodemailer");

const sendMail = (otp, email) => {
  //process of sending the mail
  try {
    const transport = nodemailer.createTransport({
      service: "GMAIL", //use service for sending the mail
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      //mail format
      from: process.env.EMAIL,
      to: email,
      subject: "Reset password otp",
      html: `<div>${otp}</div>`,
    };

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        throw new Error("Failed to send email");
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendMail;
