import React from 'react';
import { motion } from 'framer-motion';
import { Loader } from "lucide-react";

type SubmitButtonProps = {
    type: "button" | "submit" | "reset",
    disabled: boolean,
    isLoading: boolean,
    title: string,
}

const SubmitButton: React.FC<SubmitButtonProps> = ( { type, disabled, title, isLoading } ) => {
  return (
    <motion.button
    className="mt-5 w-full py-3 px-4 bg-gray-800 text-white 
            font-bold rounded-lg shadow-lg focus:cursor-pointer transition duration-200 cursor-pointer disabled:opacity-50"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    type={type}
    disabled={disabled}
  >
    {isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : title}
  </motion.button>
  )
}

export default SubmitButton;
