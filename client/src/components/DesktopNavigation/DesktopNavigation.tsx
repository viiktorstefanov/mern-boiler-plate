import React from 'react';

import { NavBarItems } from '../../constants/navBarItems';
import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';

import NavBarItem from '../NavBarItem/NavBarItem';
import { Link } from 'react-router-dom';

const DesktopNavigation: React.FC = () => {

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  const filteredRoutes = NavBarItems.filter(item => {
    if (!isAuthenticated && item.label === 'Logout') return false;
    if (isAuthenticated && item.label === 'Login') return false;
    if (isAuthenticated && item.label === 'Register') return false;
    return true;
  });

  return (
    <nav className='w-full flex justify-between items-center px-10'>
      <div className='logo'>
        <h1 className='font-semibold text-2xl'><Link to={'/'}>MERN TEMPLATE</Link></h1>
      </div>
      <ul className='flex justify-center gap-10'>
        {filteredRoutes.map(item => 
            <NavBarItem key={item.label} route={item.route} label={item.label} className={'text-white hover:underline'}/>
        )}
      </ul>
    </nav>
  )
};

export default DesktopNavigation;
