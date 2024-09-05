import React from 'react';
import { Link } from 'react-router-dom';
import { copyrights } from '../../constants/copyrights';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='w-full text-base text-white py-12 bg-slate-600'>
      <p>{copyrights.copyrightMessage}</p>
      <span>&copy; {currentYear} Copyright:{" "}</span>
      <Link className='hover:underline' target="_blank" to={copyrights.linkedInURL}>{copyrights.owner}</Link>
    </footer>
  )
};

export default Footer;
