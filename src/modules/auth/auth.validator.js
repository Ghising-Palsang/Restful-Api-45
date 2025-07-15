const Joi = require("joi");

let passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,25}$/;

const RegisterUserDTD = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().regex(passwordPattern).required(),
  confirmPassword: Joi.ref("password"),
  role: Joi.string().regex(/^(customer|seller)$/i),
  phone: Joi.string().allow(null, "").optional().default(null),
  gender: Joi.string()
    .regex(/^(male|female|other)$/i)
    .optional()
    .default("other")
    .required(),
});

const LoginDTO = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = {
  RegisterUserDTD,
  LoginDTO,
};
