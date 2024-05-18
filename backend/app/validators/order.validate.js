const Joi = require("joi");
const ObjectId = require("joi-objectid")(Joi);

const orderValidate= Joi.object({
  userId: ObjectId().required(), // Validate user ID as an ObjectId
  products: Joi.array()
    .items(
      Joi.object({
        product: ObjectId().required(), // Validate product ID as an ObjectId
        quantity: Joi.number().min(1).required(), // Validate quantity as a positive number
      })
    )
    .required(), // Ensure products array is not empty
  totalPrice: Joi.number().positive().required(), // Validate totalPrice as a positive number
  status: Joi.string().valid("Pending", "Accepted", "Rejected").required(), // Validate status enum
  description: Joi.string().optional(), // Make description optional
});

module.exports = orderValidate;
