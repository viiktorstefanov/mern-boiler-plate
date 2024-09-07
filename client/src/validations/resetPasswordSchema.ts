import * as Validator from "yup";

export const resetPasswordSchema = Validator.object().shape({
    password: Validator.string()
                        .min(6)
                        .matches(/[a-z]/)
                        .matches(/[A-Z]/)
                        .matches(/\d/)
                        .matches(/[!@#$%^&*(),.?":{}|<>]/).required(),
    confirmPassword: Validator.string().required('Enter confirm password').oneOf([Validator.ref('password')], 'Passwords do not match'),
});