const { users } = require("../../service");

const reVerifyEmail = async (req, res, next) => {
  const { email } = req.body;
  await users.reVerifyEmail(email);
  res.json({ message: "Verification email sent" });
};

module.exports = reVerifyEmail;