const { auth } = require("../../service");

const register = async (req, res) => {
  const user = await auth.register(req.body);

  res.status(201).json({ status: "Created", user });
};

module.exports = register;