import React from 'react';
import { Mail as MailIcon, Lock as LockIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import { signInSchema } from "../../validations/signInSchema";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import Input from "../../components/Input/Input";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../../services/authService";
import { setError, setIsLoading, setUser } from "../../state/auth/authSlice";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";

type FormValues = {
    email: string;
    password: string;
  };

const SignInForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const initialValues: FormValues = { email: "", password: "" };
    const isLoading = useSelector((state: RootState) => state.auth.isLoading);

    const onSubmit = async (credentials: FormValues) => {
        try {
          dispatch(setIsLoading(true));
          const response = await login(credentials);
          const user = response.data.user;
          dispatch(setUser(user));
          navigate('/');
        } catch(error: unknown) {
          if (axios.isAxiosError(error) && error.response) {
            dispatch(setError(error.response.data.message));
          } else {
            dispatch(setError('An unexpected error occurred'));
          }
        } finally {
          dispatch(setIsLoading(false));    
        }
      }

  return (
    <Formik
    initialValues={initialValues}
    validationSchema={signInSchema}
    onSubmit={onSubmit}
  >
    {({ isValid, errors, touched }) => (
      <Form>
        <Input
          name="email"
          Icon={MailIcon}
          type="email"
          placeholder="Email Address"
          className=""
        />
        <Input
          name="password"
          Icon={LockIcon}
          type="password"
          placeholder="Password"
          className=""
        />

        <div className="flex justify-end items-center mb-6">
          <Link
            to="/auth/forgot-password"
            className="text-sm text-white hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        {errors && errors.email && touched.email && (
          <p className="text-red-600 text-sm  mt-2 mb-2">
            {errors.email}
          </p>
        )}
          {errors && errors.password && touched.password && (
          <p className="text-red-600 text-sm  mt-2 mb-2">
            {errors.password}
          </p>
        )}
        <SubmitButton
          type="submit"
          disabled={!isValid}
          isLoading={isLoading}
          title={"Login"}
        />
      </Form>
    )}
  </Formik>
  )
}

export default SignInForm;
