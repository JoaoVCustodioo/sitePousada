import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { LanguageProvider } from "./i18n/LanguageContext";
import Home from "./pages/Home/Home";
import Acomodacoes from "./pages/Acomodacoes/Acomodacoes";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      offset: 80,
      easing: "ease-out-cubic",
    });
  }, []);

  return (
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Acomodacoes" element={<Acomodacoes />} />
        {/* Redirect /Home to / to avoid duplicate routes */}
        <Route path="/Home" element={<Navigate to="/" replace />} />
      </Routes>
    </LanguageProvider>
  );
};

export default App;