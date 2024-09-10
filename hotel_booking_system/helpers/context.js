require("express-async-errors");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const validateToken = require("./validateToken");

module.exports = async (req, res) => {
  const token = validateToken(req, res);
  const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);

  const user = await User.findOne({ _id: decoded._id });
  if (!user) return res.status(400).send(`Invalid request !`);

  return decoded;
};
