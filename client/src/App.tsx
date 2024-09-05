import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";
import notification from "./services/notification";

function App() {

  const error = useSelector((state: RootState) => state.auth.error);

  useEffect(() => {
    if(error) {
      notification.error(error);
    }
  }, [error]);

  return (
   <main className="min-h-screen bg-slate-400 overflow-hidden flex flex-col items-center justify-center relative">
      <ToastContainer />
      <Header />
      <AppRoutes />
      <Footer />
   </main>
  )
}

export default App;
