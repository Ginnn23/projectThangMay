import { useEffect } from "react";
import AOS from "aos";

import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-out-cubic",
      once: true,
      offset: 100,
    });
  }, []);

  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
