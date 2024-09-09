import React from "react";
import { useParams } from "react-router-dom";

import { motion } from "framer-motion";

import ResetPasswordForm from "../../components/ResetPasswordForm/ResetPasswordForm";

const ResetPassword: React.FC = () => {
  const { token } = useParams();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden mt-10"
    >
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-white bg-clip-text">
          Reset Password
        </h2>

        {token ? <ResetPasswordForm token={token} /> : null}
        
      </div>
    </motion.section>
  );
};

export default ResetPassword;
