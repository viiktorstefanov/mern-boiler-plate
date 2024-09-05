import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import EmailVerification from "../pages/EmailVerification/EmailVerification";

const AppRoutes: React.FC = () => {
    return (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/register" element={<SignUp />} />
          <Route path="/auth/login" element={<SignIn />} />
          <Route path="/auth/verify-email" element={<EmailVerification />} />
        </Routes>
    );
  };
  
  export default AppRoutes;