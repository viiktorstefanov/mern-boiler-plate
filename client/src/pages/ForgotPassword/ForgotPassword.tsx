import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import Input from "../../components/Input/Input";
import axios from "axios";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setError, setIsLoading } from "../../state/auth/authSlice";
import { forgotPasswordSchema } from "../../validations/forgotPasswordSchema";
import SubmitButton from "../../components/SubmitButton/SubmitButton";
import { forgotPassword } from "../../services/authService";
import ResetLinkContainer from "../../components/ResetLinkContainer/ResetLinkContainer";
import BackToLoginContainer from "../../components/BackToLoginContainer/BackToLoginContainer";

type FormValues = {
  email: string;
};

const ForgotPassword: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  const initialValues: FormValues = { email: "" };
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (credentials: FormValues) => {
    try {
      dispatch(setIsLoading(true));
      await forgotPassword(credentials.email);
      setIsSubmitted(true);
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
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-lg w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text">
          Forgot Password
        </h2>

        {!isSubmitted ? (
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
        ) : (
          <ResetLinkContainer />
        )}
      </div>

      <BackToLoginContainer />
    </motion.section>
  );
};

export default ForgotPassword;
