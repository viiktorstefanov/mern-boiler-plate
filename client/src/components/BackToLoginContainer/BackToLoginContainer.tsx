import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from "lucide-react";

const BackToLoginContainer: React.FC = () => {
  return (
    <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
    <Link
      to={"/auth/login"}
      className="text-sm text-white hover:underline flex items-center"
    >
      <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
    </Link>
  </div>
  )
}

export default BackToLoginContainer;
