import React from 'react'
import MobileNavigation from '../MobileNavigation/MobileNavigation';
import DesktopNavigation from '../DesktopNavigation/DesktopNavigation';

const Header: React.FC = () => {

  const isMobile = window.innerWidth <= 418;

  return (
    <header>
      {isMobile ?  <MobileNavigation /> : <DesktopNavigation />}
    </header>
  )
}

export default Header;
