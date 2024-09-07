import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import notification from "./services/notification";
import Loader from "./components/Loader/Loader";
import useAuthCheck from "./hooks/useAuthCheck";
import { useDispatch } from "react-redux";
import { clearError } from "./state/auth/authSlice";


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
