import * as Validator from "yup";

const FORBIDDEN_CHARS_REGEX = /^[^<>/"'&]*$/;

export const signUpSchema = Validator.object().shape({
    email: Validator.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email address').required("Enter a valid email address"),
    password: Validator.string()
                        .min(6)
                        .matches(/[a-z]/)
                        .matches(/[A-Z]/)
                        .matches(/\d/)
                        .matches(/[!@#$%^&*(),.?":{}|<>]/).required(),
    username: Validator.string().matches(FORBIDDEN_CHARS_REGEX, 'Username contains forbidden characters (e.g., <, >, ", \', &, etc.)').required("Enter a username to create your account").max(30).min(3)
});

   