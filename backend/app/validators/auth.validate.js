const Joi = require('joi')

//validate body on sign up user
module.exports.signupValidate = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required().email(),
    // includes lower case , camel case , special character and number with min 8 character length
    password: Joi.string().required().pattern(/(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/).message("password must has number,lowercase,uppercase,special char and at least 8 character"),
})

//validate new password on reset password
module.exports.resetPasswordValidate = Joi.object({
    // includes lower case , camel case , special character and number with min 8 character length
    newPassword: Joi.string().required().pattern(/(?=.{8,})(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/).message("password must has number,lowercase,uppercase,special char and at least 8 character"),
})
