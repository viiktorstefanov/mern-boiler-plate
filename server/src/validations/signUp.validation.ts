import Joi from "joi";

export const signupSchema = Joi.object({
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
    .custom((value, helpers) => {
      const lowerCasePattern = /[a-z]/;
      const upperCasePattern = /[A-Z]/;
      const numberPattern = /\d/;
      const specialCharrPatern = /[^A-Za-z0-9]/;

      if (!lowerCasePattern.test(value)) {
        return helpers.message(
          "Password should contain at least one lowercase letter" as any
        );
      }

      if (!upperCasePattern.test(value)) {
        return helpers.message(
          "Password should contain at least one uppercase letter" as any
        );
      }

      if (!numberPattern.test(value)) {
        return helpers.message(
          "Password must contain at least one number" as any
        );
      }

      if (!specialCharrPatern.test(value)) {
        return helpers.message(
          "Password must contain at least one special character (e.g., !, @, #, $, %, &)" as any
        );
      }

      return value;
    })
    .messages({
      "string.min": "Password must be at least 6 characters",
      "any.required": "Enter your password",
    }),
  username: Joi.string().alphanum().min(3).max(30).required(),
});
