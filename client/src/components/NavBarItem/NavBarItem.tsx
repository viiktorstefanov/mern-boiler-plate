import React from 'react'
import { Link } from 'react-router-dom';

type NavBarItemProps = {
  route: string,
  label: string,
  className: string,
  onClick?: () => void,
}

const NavBarItem: React.FC<NavBarItemProps> = ( { route, label, className, onClick} ) => {
  return (
    <li className={`${className}`} onClick={onClick}><Link to={route}>{label}</Link></li>
  )
}

export default NavBarItem;
