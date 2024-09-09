import React from "react";

import { motion } from "framer-motion";

import SignInForm from "../../components/SignInForm/SignInForm";
import NotHaveAccount from "../../components/NotHaveAccount/NotHaveAccount";

const SignIn: React.FC = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mt-10"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-white text-transparent bg-clip-text">
          Welcome Back
        </h2>

        <SignInForm />
      </div>
      <NotHaveAccount />
    </motion.section>
  );
};

export default SignIn;
