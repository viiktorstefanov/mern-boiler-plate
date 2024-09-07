import React, { useState } from "react";
import { motion } from "framer-motion";
import ResetLinkContainer from "../../components/ResetLinkContainer/ResetLinkContainer";
import BackToLoginContainer from "../../components/BackToLoginContainer/BackToLoginContainer";
import ForgotPasswordForm from "../../components/ForgotPasswordForm/ForgotPasswordForm";

const ForgotPassword: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const changeIsSubmitted = () => {
    setIsSubmitted(true);
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
          <ForgotPasswordForm changeIsSubmitted={changeIsSubmitted} />
        ) : (
          <ResetLinkContainer />
        )}
      </div>

      <BackToLoginContainer />
    </motion.section>
  );
};

export default ForgotPassword;
