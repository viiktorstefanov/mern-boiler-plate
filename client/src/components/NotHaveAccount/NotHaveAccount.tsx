import React from 'react';
import { Link } from "react-router-dom";

const NotHaveAccount: React.FC = () => {
  return (
    <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
    <p className="text-sm text-gray-400">
      Don't have an account?{" "}
      <Link to="/auth/register" className="text-white hover:underline">
        Sign up
      </Link>
    </p>
  </div>
  )
}

export default NotHaveAccount;
