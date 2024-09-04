import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
    );
  };
  
  export default AppRoutes;