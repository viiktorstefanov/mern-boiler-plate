import React from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";

const ResetLinkContainer: React.FC = () => {
  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4"
      >
        <Mail className="h-8 w-8 text-gray-800" />
      </motion.div>
      <p className="text-gray-300 mb-6 text-lg">
        A password reset link has been sent to your email
      </p>
    </div>
  );
};

export default ResetLinkContainer;
