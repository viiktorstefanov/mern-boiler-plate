import React from "react";
import { motion } from "framer-motion";
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

const SignIn: React.FC = () => {
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mb-10"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text">
          Welcome Back
        </h2>

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
      </div>
      <div className='px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center'>
				<p className='text-sm text-gray-400'>
					Don't have an account?{" "}
					<Link to='/auth/register' className='text-white hover:underline'>
						Sign up
					</Link>
				</p>
	   </div>
    </motion.section>
  );
};

export default SignIn;
