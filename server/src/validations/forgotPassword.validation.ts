import Joi from "joi";

export const forgotPasswordSchema = Joi.object({
    email: Joi.string()
    .email()
    .required()
    .pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
    .messages({
      "string.email": "Invalid email",
      "any.required": "Enter your email address",
      "string.pattern.base": "Invalid email",
    })
});
