import React from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../../components/Input/Input";
import { Lock } from "lucide-react";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { useSelector } from "react-redux";
import axios from "axios";
import { RootState } from "../../state/store";
import { Formik, Form } from "formik";
import { resetPasswordSchema } from "../../validations/resetPasswordSchema";
import PasswordMeter from "../../components/PasswordMeter/PasswordMeter";
import notification from "../../services/notification";
import { setError, setIsLoading } from "../../state/auth/authSlice";
import { resetPassword } from "../../services/authService";

type FormValues = {
    password: string;
    confirmPassword: string;
  };

  type ResetPasswordFormProps = {
    token: string,
  }

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);
    const initialValues: FormValues = { password: "", confirmPassword: "" };

  const onSubmit = async (credentials: FormValues) => {
    try {
      dispatch(setIsLoading(true));
      if(token) {
        await resetPassword(token, credentials.password);
        navigate('/');
        notification.success('Password reset successfully');
      }
    } catch(error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch(setError(error.response.data.message));
      } else {
        dispatch(setError('An unexpected error occurred'));
      }
    } finally {
      dispatch(setIsLoading(false));  
    }
    
  };

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={resetPasswordSchema}
    onSubmit={onSubmit}
  >
    {({ isValid, errors, touched, values }) => (
      <Form>
        <Input
          Icon={Lock}
          type="password"
          placeholder="New Password"
          name="password"
          className=""
        />

        <Input
          Icon={Lock}
          type="password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          className=""
        />

         {errors && errors.confirmPassword && touched.confirmPassword && (
          <p className="text-red-600 text-sm  mt-2 mb-2">
            {errors.confirmPassword}
          </p>
        )}
      <PasswordMeter password={values.password} />

        <SubmitButton
          type="submit"
          disabled={!isValid}
          isLoading={isLoading}
          title={"Set New Password"}
        />
      </Form>
    )}
  </Formik>
  )
}

export default ResetPasswordForm;
