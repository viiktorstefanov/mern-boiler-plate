import React from 'react';
import { Mail } from "lucide-react";
import Input from "../../components/Input/Input";
import axios from "axios";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setError, setIsLoading } from "../../state/app/appSlice";
import { forgotPasswordSchema } from "../../validations/forgotPasswordSchema";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { forgotPassword } from "../../services/authService";

type FormValues = {
    email: string;
};

type ForgotPasswordFormProps = {
    changeIsSubmitted: () => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ( { changeIsSubmitted } ) => {
    const dispatch = useDispatch();
    const isLoading = useSelector((state: RootState) => state.app.isLoading);
    const initialValues: FormValues = { email: "" };

    const onSubmit = async (credentials: FormValues) => {
        try {
          dispatch(setIsLoading(true));
          await forgotPassword(credentials.email);
          changeIsSubmitted();
        } catch (error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            dispatch(setError(error.response.data.message));
          } else {
            dispatch(setError("An unexpected error occurred"));
          }
        } finally {
          dispatch(setIsLoading(false));
        }
      };

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={forgotPasswordSchema}
    onSubmit={onSubmit}
  >
    {({ isValid, errors, touched }) => (
      <Form>
        <p className="text-gray-300 mb-6 text-center">
          Enter your email address and we'll send you a link to reset
          your password.
        </p>

        <Input
          Icon={Mail}
          type="email"
          placeholder="Email Address"
          name="email"
          className=""
        />

        {errors && errors.email && touched.email && (
          <p className="text-red-600 text-sm  mt-2 mb-2">
            {errors.email}
          </p>
        )}

        <SubmitButton
          type="submit"
          disabled={!isValid}
          isLoading={isLoading}
          title={"Send Reset Link"}
        />
      </Form>
    )}
  </Formik>
  )
}

export default ForgotPasswordForm;
