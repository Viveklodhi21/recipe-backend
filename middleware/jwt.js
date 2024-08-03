const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();
const secret = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
  try {
    let token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, secret);
    next();
  } catch (error) {
    var resData = {
      status: false,
      message: "You are not authorized",
      data: null,
    };
    return res.status(401).json(resData);
  }
};

module.exports = { authenticate };
