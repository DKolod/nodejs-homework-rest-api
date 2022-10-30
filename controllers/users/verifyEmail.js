const { users } = require("../../service");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;

  await users.verifyEmail(verificationToken);

  res.json({
    message: "Verify success",
  });
};

module.exports = verifyEmail;