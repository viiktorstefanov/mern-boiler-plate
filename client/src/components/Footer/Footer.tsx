import React from 'react';
import { Link } from 'react-router-dom';
import { copyrights } from '../../constants/copyrights';

const Footer: React.FC = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className='text-base'>
      <p>{copyrights.copyrightMessage}</p>
      <span>&copy; {currentYear} Copyright:{" "}</span>
      <Link target="_blank" to={copyrights.linkedInURL}>{copyrights.owner}</Link>
    </footer>
  )
};

export default Footer;
