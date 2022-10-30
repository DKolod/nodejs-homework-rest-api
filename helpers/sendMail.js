const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async (data) => {
  const msg = {
    from: "dima.kolod@gmail.com",
    ...data,
  };

  try {
    await sgMail.send(msg);
    return true;
  } catch (error) {
    return error.message;
  }
};

module.exports = sendMail;