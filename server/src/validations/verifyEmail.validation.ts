import Joi from "joi";

export const verifyEmailSchema = Joi.object({
  code: Joi.string()
    .required()
    .pattern(/^[0-9]+$/)
    .messages({
      "any.required": "Enter your code",
      "string.pattern.base": "Code must contain only numbers",
    }),
});
