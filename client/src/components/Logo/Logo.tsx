import React from 'react';
import { Link } from 'react-router-dom';


const Logo: React.FC = () => {
  return (
    <div className="logo">
    <h1 className="font-semibold text-2xl">
      <Link to={"/"}>MERN TEMPLATE</Link>
    </h1>
  </div>
  )
}

export default Logo;
