import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Home from "./pages/Home/Home";
import Acomodacoes from "./pages/Acomodacoes/Acomodacoes";

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/Acomodacoes" element={<Acomodacoes />} />
    </Routes>
  );
}

export default App;