import React from 'react'
import { Link } from 'react-router-dom';

const HaveAnAccount:React.FC = () => {
  return (
    <div className="px-8 py-4 bg-gray-900 bg-opacity-50 flex justify-center">
    <p className="text-sm text-gray-400">
      Already have an account?{" "}
      <Link to={"/login"} className="text-white hover:underline">
        Login
      </Link>
    </p>
  </div>
  )
}

export default HaveAnAccount;
