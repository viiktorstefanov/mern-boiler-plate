import React from 'react';
import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <motion.section
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
    className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 text-white backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
  >
      <h1>Error 404</h1>
    </motion.section>
  )
}

export default NotFound;
