const { User } = require("../../models");
const { RequestError, sendMail } = require("../../helpers");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const gravatar = require("gravatar");

const { PORT } = process.env;

const register = async ({ password, email, subscription }) => {
  const user = await User.findOne({ email });

  if (user) {
    throw RequestError(409, `Email ${email} in use.`);
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = uuidv4();

  const newUser = await User.create({
    password,
    email,
    subscription,
    avatarURL,
    verificationToken,
  });

  await sendMail({
    to: email,
    subject: "Confirm your registration!",
    text: `Please confirm your email adress POST http://localhost:${PORT}/api/users/verify/${verificationToken}`,
    html: `<a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">confirm your verification</a`,
  });
  return { email: newUser.email, subscription: newUser.subscription };
};

module.exports = register;