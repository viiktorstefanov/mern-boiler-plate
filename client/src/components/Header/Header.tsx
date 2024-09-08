import React from 'react';

import MobileNavigation from '../MobileNavigation/MobileNavigation';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';

const Header: React.FC = () => {

  const isMobile = window.innerWidth <= 418;

  return (
    <header className='w-full text-base text-white py-12 bg-slate-600 mb-10'>
      {isMobile ?  <MobileNavigation /> : <DesktopNavigation />}
    </header>
  )
}

export default Header;
