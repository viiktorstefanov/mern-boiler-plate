import Joi from "joi";

export const signInSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.email": "Invalid email",
      "any.required": "Enter your email address",
      "string.pattern.base": "Invalid email",
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Enter your password",
    }),
});
