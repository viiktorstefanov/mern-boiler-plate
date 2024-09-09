import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "./state/store";
import { clearError} from "./state/app/appSlice";
import { setIsMobile } from "./state/app/appSlice";

import useAuthCheck from "./hooks/useAuthCheck";

import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";

import notification from "./services/notification";

import { checkIsMobile } from "./utils/screenChecker";

function App() {
  const dispatch = useDispatch();
  const checkAuthentication = useAuthCheck();
  const error = useSelector((state: RootState) => state.app.error);

  useEffect(() => {
    checkAuthentication();
  }, []);

  useEffect(() => {
    
    const handleResize = () => {
      dispatch(setIsMobile(checkIsMobile()));      
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  useEffect(() => {
    if(error) {
      notification.error(error);
    }
    dispatch(clearError());
  }, [error, dispatch]);

  return (
   <main className="min-h-screen bg-slate-400 overflow-hidden flex flex-col items-center relative">
      <Header />
      <AppRoutes />
      <Footer />
   </main>
  )
}

export default App;
