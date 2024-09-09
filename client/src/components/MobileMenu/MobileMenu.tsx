import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { navBarItem } from "../../utils/filterRoutes";
import NavBarItem from "../NavBarItem/NavBarItem";
import { useDispatch } from "react-redux";
import { setShowMobileMenu } from "../../state/app/appSlice";

type MobileMenuProps = {
  routes: navBarItem[];
  showMobileMenu: boolean;
};

const MobileMenu: React.FC<MobileMenuProps> = ({ routes, showMobileMenu }) => {
  console.log(showMobileMenu);

  const dispatch = useDispatch();

  const onMobileRouteClick = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <AnimatePresence>
      {showMobileMenu && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }} 
          animate={{ opacity: 1, x: 0 }} 
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.5 }}
          className="w-full z-50 absolute top-full bg-slate-500 flex justify-start px-10 py-5 min-h-dvh overflow-y-auto"
        >
          <ul className="flex flex-col gap-10 py-10">
            {routes.map((item) => (
              <NavBarItem
                key={item.label}
                route={item.route}
                label={item.label}
                className="text-white hover:underline text-left uppercase"
                onClick={onMobileRouteClick}
              />
            ))}
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
