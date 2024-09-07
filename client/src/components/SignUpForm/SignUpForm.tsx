import React from "react";
import {
  User as UserIcon,
  Mail as MailIcon,
  Lock as LockIcon,
} from "lucide-react";
import { Formik, Form } from "formik";
import Input from "../Input/Input";
import PasswordMeter from "../PasswordMeter/PasswordMeter";
import SubmitButton from "../SubmitButton/SubmitButton";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setError, setIsLoading, setUser } from "../../state/auth/authSlice";
import { register } from "../../services/authService";
import axios from "axios";
import { signUpSchema } from "../../validations/signUpSchema";

type FormValues = {
  email: string;
  password: string;
  username: string;
};

const SignUpForm: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValues: FormValues = { email: "", password: "", username: "" };
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const onSubmit = async (credentials: FormValues) => {
    try {
      dispatch(setIsLoading(true));
      const response = await register(credentials);
      const user = response.data.user;
      dispatch(setUser(user));
      navigate("/");
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
      validationSchema={signUpSchema}
      onSubmit={onSubmit}
    >
      {({ isValid, values, errors, touched }) => (
        <Form>
          <Input
            name="email"
            Icon={MailIcon}
            type="email"
            placeholder="Email Address"
            className=""
          />

          <Input
            name="username"
            Icon={UserIcon}
            type="text"
            placeholder="Username"
            className=""
          />
          <Input
            name="password"
            Icon={LockIcon}
            type="password"
            placeholder="Password"
            className=""
          />
          {errors && errors.email && touched.email && (
            <p className="text-red-600 text-sm  mt-2 mb-2">{errors.email}</p>
          )}
          {errors && errors.username && touched.username && (
            <p className="text-red-600 text-sm  mt-2">{errors.username}</p>
          )}
          <PasswordMeter password={values.password} />
          <SubmitButton
            type="submit"
            disabled={!isValid}
            isLoading={isLoading}
            title={"Sign Up"}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
