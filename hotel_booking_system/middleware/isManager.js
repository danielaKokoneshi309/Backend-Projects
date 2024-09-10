const context = require("../helpers/context");

module.exports = async (req, res, next) => {
  const user = await context(req, res);
  req.user = user;

  if (!user.isManager) return res.status(401).send(`Unauthorized request.`);
  next();
};
