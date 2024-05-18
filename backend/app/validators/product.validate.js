const Joi = require("joi");

// validate body for create product
module.exports.productValidate = Joi.object({
  image: Joi.string().allow(""),
  title: Joi.string().required(),
  category: Joi.string().required(),
  price: Joi.number().required(),
  description: Joi.string().allow(""),
  height: Joi.number().allow(""),
  width: Joi.number().allow(""),
  depth: Joi.number().allow(""),
  weight: Joi.number().allow(""),
  color: Joi.string().allow(""),
  rate: Joi.number().allow(""),
  brand: Joi.string().allow(""),
});
