import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import SignUp from "../pages/SignUp/SignUp";
import SignIn from "../pages/SignIn/SignIn";
import EmailVerification from "../pages/EmailVerification/EmailVerification";
import VerifiedRoute from "../guards/isVerifiedGuard";
import NotFound from "../pages/NotFound/NotFound";

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/auth/*"
        element={
          <VerifiedRoute>
            <Routes>
              <Route path="/register" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/verify-email" element={<EmailVerification />} />
            </Routes>
          </VerifiedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
