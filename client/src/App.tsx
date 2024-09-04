import Header from "./components/Header/Header";
import AppRoutes from "./routes/AppRoutes";
import Footer from "./components/Footer/Footer";

function App() {

  return (
   <main className="min-h-screen bg-slate-400 overflow-hidden flex flex-col items-center justify-center relative">
      <Header />
      <AppRoutes />
      <Footer />
   </main>
  )
}

export default App;
