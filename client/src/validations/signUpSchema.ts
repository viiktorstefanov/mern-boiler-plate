import * as Validator from "yup";

export const signUpSchema = Validator.object().shape({
    email: Validator.string().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Невалиден имейл').required("Невалиден имейл"),
    password: Validator.string().min(6).required(),
    username: Validator.string().required("Choose a username to create your account.")
});