import React from 'react';
import NavBarItem from '../NavBarItem/NavBarItem';
import { navBarItem } from '../../utils/filterRoutes';

type DesktopNavRoutesProps = {
    routes: navBarItem[]
  }

const DesktopNavRoutes: React.FC<DesktopNavRoutesProps> = ( { routes } ) => {
  return (
    <ul className="flex justify-center gap-10">
    {routes.map((item) => (
      <NavBarItem
        key={item.label}
        route={item.route}
        label={item.label}
        className={"text-white text-xl hover:underline"}
      />
    ))}
  </ul>
  )
}

export default DesktopNavRoutes
