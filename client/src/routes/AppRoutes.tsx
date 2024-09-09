import { Route, Routes } from "react-router-dom";

import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import EmailVerification from "../pages/EmailVerification/EmailVerification";
import NotFound from "../pages/NotFound/NotFound";
import ForgotPassword from "../pages/ForgotPassword/ForgotPassword";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Loader from "../components/Loader/Loader";
import { ToastContainer } from 'react-toastify';

import VerifiedRoute from "../guards/isVerifiedGuard";
import IsLoggedGuard from "../guards/isLoggedGuard";
import Logout from "../components/Logout/Logout";

const AppRoutes: React.FC = () => {
  
  return (
    <>
      <ToastContainer />
      <Loader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/auth/*"
          element={
            <VerifiedRoute>
              <Routes>
                <Route
                  path="/register"
                  element={
                    <IsLoggedGuard>
                      <SignUp />
                    </IsLoggedGuard>
                  }
                />
                <Route
                  path="/login"
                  element={
                    <IsLoggedGuard>
                      <SignIn />
                    </IsLoggedGuard>
                  }
                />
                <Route path="/logout" element={<Logout />} />
                <Route path="/verify-email" element={<EmailVerification />} />
                <Route
                  path="/forgot-password"
                  element={
                    <IsLoggedGuard>
                      <ForgotPassword />
                    </IsLoggedGuard>
                  }
                />
                <Route
                  path="/reset-password/:token"
                  element={
                    <IsLoggedGuard>
                      <ResetPassword />
                    </IsLoggedGuard>
                  }
                />
              </Routes>
            </VerifiedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
