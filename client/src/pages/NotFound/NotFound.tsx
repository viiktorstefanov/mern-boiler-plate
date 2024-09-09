import React from 'react';
import { Link } from 'react-router-dom';

import { motion } from 'framer-motion';

const NotFound: React.FC = () => {
  return (
    <motion.section
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
    className='max-w-md w-full mx-auto p-8 bg-gray-900 bg-opacity-80 text-white backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 mt-10'
  >
      <div className='text-center'>
        <h1 className='text-4xl font-bold mb-4'>404</h1>
        <p className='text-xl mb-6'>Oops! The page you're looking for doesn't exist.</p>
        <p className='text-gray-400 mb-8'>It might have been moved or deleted.</p>
        <Link to="/" className='text-white text-lg font-semibold'>
          Return to Homepage
        </Link>
      </div>
    </motion.section>
  )
}

export default NotFound;
