const { auth } = require("../../service");

const login = async (req, res) => {
  const { email, password } = req.body;
  const { token, user } = await auth.login(password, email);

  res.status(200).json({ user, token });
};

module.exports = login;