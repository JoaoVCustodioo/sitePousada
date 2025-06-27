import { Routes, Route } from 'react-router-dom';
import Home from "./pages/Home/Home";
import Acomodacoes from "./pages/Acomodacoes/Acomodacoes";

const App = () => {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Acomodacoes" element={<Acomodacoes />} />
        
      </Routes>
  );
}

export default App;