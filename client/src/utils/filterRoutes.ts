import { NavBarItems } from "../constants/navBarItems"

export const filterRoutes = (isAuthenticated: boolean) => {
    const excludeItems = new Set();

  if (isAuthenticated) {
    excludeItems.add("Login");
    excludeItems.add("Register");
  } else {
    excludeItems.add("Logout");
  }

  const filteredRoutes = NavBarItems.filter(
    (item) => !excludeItems.has(item.label)
  );

  return filteredRoutes;
}