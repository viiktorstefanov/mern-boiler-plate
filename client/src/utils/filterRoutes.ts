import { NavBarItems } from "../constants/navBarItems";

export type navBarItem = {
  label: string,
  route: string,
};

export const filterRoutes = (isAuthenticated: boolean): navBarItem[] => {

  const filteredRoutes = NavBarItems.filter(route => {
    if (!isAuthenticated && route.label === 'Logout') return false;
    if (isAuthenticated && route.label === 'Login') return false;
    if (isAuthenticated && route.label === 'Register') return false;
    return true;
  });

  return filteredRoutes;
};

