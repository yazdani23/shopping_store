const Joi = require("joi");

// validate body for create product
module.exports.categoryValidate = Joi.object({
  image: Joi.string().allow(""),
  name: Joi.string().required(),
  description: Joi.string().allow(''),
});
