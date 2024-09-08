import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./state/store";
import { clearError } from "./state/auth/authSlice";

import useAuthCheck from "./hooks/useAuthCheck";

import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import Loader from "./components/Loader/Loader";

import notification from "./services/notification";

import { ToastContainer } from 'react-toastify';

function App() {
  const dispatch = useDispatch();
  const checkAuthentication = useAuthCheck();
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    if(error) {
      notification.error(error);
    }
    dispatch(clearError());
  }, [error]);

  return (
   <main className="min-h-screen bg-slate-400 overflow-hidden flex flex-col items-center justify-center relative">
      <ToastContainer />
      <Loader />
      <Header />
      <AppRoutes />
      <Footer />
   </main>
  )
}

export default App;
