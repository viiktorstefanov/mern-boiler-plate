import React from "react";
import { motion } from "framer-motion";
import {
  User as UserIcon,
  Mail as MailIcon,
  Lock as LockIcon,
} from "lucide-react";
import { Formik, Form } from "formik";
import Input from "../../components/Input/Input";
import { signUpSchema } from "../../validations/signUpSchema";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import HaveAnAccount from "../../components/HaveAnAccount/HaveAnAccount";
import PasswordMeter from "../../components/PasswordMeter/PasswordMeter";
import { register } from "../../services/authService";
import { useDispatch } from "react-redux";
import { setError, setIsLoading, setUser } from "../../state/auth/authSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";


type FormValues = {
  email: string;
  password: string;
  username: string;
};

const SignUp: React.FC = () => {
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
      navigate('/');
    } catch (error: unknown) {
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mb-10"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text">
          Create Account
        </h2>
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
                <p className="text-red-600 text-sm  mt-2 mb-2">
                  {errors.email}
                </p>
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
      </div>

      <HaveAnAccount />
    </motion.section>
  );
};

export default SignUp;
