import React from 'react'
import { Link } from 'react-router-dom';

type NavBarItemProps = {
  route: string,
  label: string,
  className: string,
}

const NavBarItem: React.FC<NavBarItemProps> = ( { route, label, className} ) => {
  return (
    <li className={`${className}`}><Link to={route}>{label}</Link></li>
  )
}

export default NavBarItem;
