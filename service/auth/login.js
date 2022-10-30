const bcrypt = require("bcrypt");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");

const { User } = require("../../models");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const login = async (password, email) => {
  const user = await User.findOne({ email });

  if (
    !user ||
    !user.verify ||
    !(await bcrypt.compare(password, user.password))
  ) {
    throw RequestError(401, "Email or password is wrong or not verified.");
  }

  const token = await jwt.sign({ id: user._id, email }, SECRET_KEY, {
    expiresIn: "1d",
  });

  await User.updateOne({ _id: user._id }, { $set: { token } });

  return {
    token,
    user: { email: user.email, subscription: user.subscription },
  };
};


module.exports = login;