const Joi = require("joi");

exports.validateUser = function validateUser(user) {
  const schema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().min(5).email().required(),
    password: Joi.string().min(8).max(255).required(),
    isManager: Joi.boolean(),
  });

  return schema.validate(user);
};
