import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import { filterRoutes } from "../../utils/filterRoutes";

import Navigation from "../Navigation/Navigation";
import MobileMenu from "../MobileMenu/MobileMenu";

const Header: React.FC = () => {

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const showMobileMenu = useSelector(
    (state: RootState) => state.app.showMobileMenu
  );

  const filteredRoutes = filterRoutes(isAuthenticated);

  return (
    <>
      <header className="w-full text-base text-white py-12 bg-slate-600 relative">
        <Navigation routes={filteredRoutes} />

        {showMobileMenu && <MobileMenu routes={filteredRoutes} showMobileMenu={showMobileMenu}/>}
      </header>
    </> 
  );
};

export default Header;
