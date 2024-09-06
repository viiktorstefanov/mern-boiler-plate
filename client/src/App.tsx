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


function App() {
  const checkAuthentication = useAuthCheck();
  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  useEffect(() => {
    if(error) {
      notification.error(error);
    }
  }, [error]);

  return (
   <main className="min-h-screen bg-slate-400 overflow-hidden flex flex-col items-center justify-center relative">
      <Loader />
      <ToastContainer />
      <Header />
      <AppRoutes />
      <Footer />
   </main>
  )
}

export default App;
