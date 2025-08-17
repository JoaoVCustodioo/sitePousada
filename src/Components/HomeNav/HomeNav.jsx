import { Link, useLocation } from "react-router-dom";
import LogoPousada from "../../assets/images/logo-pousada.png";

const HomeNav = () => {
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className=" md:mt-12 px-2 md:px-6 flex flex-col items-center">
      <img src={LogoPousada} alt="Logo Pousada" className="h-24 md:h-40 mb-2" />
      <nav>
        <ul className="flex flex-wrap gap-6 md:gap-20 text-base md:text-2xl font-serif tracking-wide text-gray-800 justify-center">
          <li className="cursor-pointer hover:underline">
            <Link to="/">HOME</Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link to="/Acomodacoes">ACOMODAÇÕES</Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <button onClick={() => scrollToSection('experiencias')} className="font-serif">
              EXPERIÊNCIAS
            </button>
          </li>
          <li className="cursor-pointer hover:underline">
            <button onClick={() => scrollToSection('localizacao')} className="font-serif">
              LOCALIZAÇÃO
            </button>
          </li>
          <li className="cursor-pointer hover:underline">
            <button onClick={() => scrollToSection('contato')} className="font-serif">
              CONTATO
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeNav;
