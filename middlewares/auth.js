const jwt = require("jsonwebtoken");
const { users: operations } = require("../service");
require("dotenv").config();
const { RequestError } = require("../helpers");


const secret = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [tokenType = "", token = ""] = authorization.split(" ");

    if (tokenType !== "Bearer") {
      throw RequestError(401, "Not authorized");
    }

    if (!token) {
      throw RequestError(401, "Not authorized");
    }

    const userData = jwt.verify(token, secret);
    const user = await operations.authUser(userData.id);

    if (!user || user?.token !== token) {
      throw RequestError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};


module.exports = auth;