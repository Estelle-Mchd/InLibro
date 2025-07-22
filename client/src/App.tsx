import { Outlet } from "react-router";
import "./App.css";
import Header from "./components/Header/Header";
import "./global.css";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
        <ToastContainer />
      </main>
      <Footer />
    </>
  );
}

export default App;
