import Joi from "joi";

export const resetPasswordSchema = Joi.object({
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
});
