import React from "react";
import { Menu, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { onMobileMenuClick, setShowMobileMenu } from "../../state/app/appSlice";

const MobileNavRoutes: React.FC = () => {
  const dispatch = useDispatch();
  const showMenu = useSelector((state: RootState) => state.app.showMobileMenu);

  const onMenuClick = () => {
    dispatch(onMobileMenuClick());
  };

  const onClose = () => {
    dispatch(setShowMobileMenu(false));
  };

  return (
    <div>
      {!showMenu ? <Menu onClick={onMenuClick} /> : <X onClick={onClose} />}
    </div>
  );
};

export default MobileNavRoutes;
