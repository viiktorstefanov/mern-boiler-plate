import React from 'react';

import { motion } from 'framer-motion';

const Home: React.FC = () => {
  return (
    <motion.section
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.5 }}
    className='max-w-md w-full mx-auto p-8 bg-gray-900 bg-opacity-80 text-white backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800 mt-10'
  >
   <h1>HOME PAGE</h1>
  </motion.section>
  )
}

export default Home;
