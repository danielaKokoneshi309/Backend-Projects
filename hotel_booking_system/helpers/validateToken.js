const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send(`Invalid request`);

  return token;
};
