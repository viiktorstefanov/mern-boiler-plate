import Footer from "./components/Footer/Footer"
import Header from "./components/Header/Header"
import AppRoutes from "./routes/AppRoutes"

function App() {

  return (
   <main className="min-h-screen bg-slate-200 overflow-hidden flex flex-col items-center justify-center relative">
      <Header />
      <AppRoutes />
      <Footer />
   </main>
  )
}

export default App;
