import * as Validator from "yup";

export const signInSchema = Validator.object().shape({
    email: Validator.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Enter a valid email address').required("Enter a valid email address"),
    password: Validator.string().required('Enter your password'),
});