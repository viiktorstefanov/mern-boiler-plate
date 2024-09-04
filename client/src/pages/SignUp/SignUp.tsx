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

type FormValues = {
  email: string,
  password: string,
  username: string,
}

const SignUp: React.FC = () => {
  const initialValues: FormValues = { email: '', password: '', username: '' };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text">
          Create Account
        </h2>
        <Formik
          initialValues={initialValues}
          validationSchema={signUpSchema}
          onSubmit={(credentials) => {
            console.log(credentials);
          }}
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
              {errors && errors.email && touched.email &&  <p className="text-red-600 text-sm  mt-2 mb-2">{errors.email}</p>}
              {errors && errors.username && touched.username && <p className="text-red-600 text-sm  mt-2">{errors.username}</p>}
              <PasswordMeter password={values.password} />
              <SubmitButton type="submit" disabled={!isValid} isLoading={false} title={'Sign Up'}/>
            </Form>
          )}
        </Formik>
      </div>

      <HaveAnAccount />
    </motion.section>
  );
};

export default SignUp;
