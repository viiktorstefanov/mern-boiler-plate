import React from "react";

import { navBarItem } from "../../utils/filterRoutes";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import Logo from "../Logo/Logo";
import DesktopNavRoutes from "../DesktopNavRoutes/DesktopNavRoutes";
import MobileNavRoutes from "../MobileNavRoutes/MobileNavRoutes";

type DesktopNavigationProps = {
  routes: navBarItem[]
}

const Navigation: React.FC<DesktopNavigationProps> = ( { routes }) => {
  const isMobile = useSelector((state: RootState) => state.app.isMobile);
 

  return (
    <nav className="w-full flex justify-between items-center px-10">
      <Logo />
      {isMobile ? <MobileNavRoutes /> : <DesktopNavRoutes routes={routes} />}
    </nav>
  );
};

export default Navigation;
