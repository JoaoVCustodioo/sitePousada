import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import LogoPousada from "../../assets/images/logo-pousada.png";

const HomeNav = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    setIsMenuOpen(false); // Close menu on click
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
    <div className="w-full flex justify-center bg-primary z-40 relative pt-12 md:pt-14 pb-4 md:pb-6 border-b border-black/5">
      <div className="flex flex-col w-full max-w-7xl mx-auto">

        {/* Header Row: Logo & Mobile Toggle */}
        <div className="flex justify-between items-center px-4 md:px-8">
          {/* Invisible spacer to center logo visually on mobile */}
          <div className="w-10 lg:hidden"></div>

          <Link to="/" onClick={() => setIsMenuOpen(false)} className="z-50 mx-auto lg:mx-0">
            <img src={LogoPousada} alt="Logo Pousada" className="h-[70px] sm:h-20 md:h-28 object-contain" />
          </Link>

          <button
            className="lg:hidden text-secondary p-1.5 focus:outline-none bg-white shadow-sm border border-secondary/20 rounded-sm z-50 flex items-center justify-center -mr-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Alternar menu"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`w-full lg:mt-6 transition-all duration-300 origin-top ${isMenuOpen ? 'scale-y-100 opacity-100 h-auto' : 'scale-y-0 opacity-0 h-0 lg:scale-y-100 lg:opacity-100 lg:h-auto overflow-hidden'}`}>
          <ul className="flex flex-col lg:flex-row gap-0 lg:gap-12 text-sm md:text-base font-sans font-medium tracking-widest text-dark justify-center items-center bg-white lg:bg-transparent shadow-lg lg:shadow-none mt-4 lg:mt-0 py-2 lg:py-0 border-t border-black/5 lg:border-none mx-4 lg:mx-0 rounded-sm lg:rounded-none">

            <li className="cursor-pointer hover:text-secondary hover:bg-black/5 lg:hover:bg-transparent transition-colors duration-300 relative group w-full lg:w-auto text-center border-b border-black/5 lg:border-none">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 lg:py-0">HOME</Link>
              <span className="hidden lg:block absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="cursor-pointer hover:text-secondary hover:bg-black/5 lg:hover:bg-transparent transition-colors duration-300 relative group w-full lg:w-auto text-center border-b border-black/5 lg:border-none">
              <Link to="/Acomodacoes" onClick={() => setIsMenuOpen(false)} className="block w-full py-4 lg:py-0">ACOMODAÇÕES</Link>
              <span className="hidden lg:block absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="cursor-pointer hover:text-secondary hover:bg-black/5 lg:hover:bg-transparent transition-colors duration-300 relative group w-full lg:w-auto text-center border-b border-black/5 lg:border-none">
              <button onClick={() => scrollToSection('experiencias')} className="tracking-widest uppercase focus:outline-none w-full py-4 lg:py-0">
                EXPERIÊNCIAS
              </button>
              <span className="hidden lg:block absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="cursor-pointer hover:text-secondary hover:bg-black/5 lg:hover:bg-transparent transition-colors duration-300 relative group w-full lg:w-auto text-center border-b border-black/5 lg:border-none">
              <button onClick={() => scrollToSection('localizacao')} className="tracking-widest uppercase focus:outline-none w-full py-4 lg:py-0">
                LOCALIZAÇÃO
              </button>
              <span className="hidden lg:block absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </li>

            <li className="cursor-pointer hover:text-secondary hover:bg-black/5 lg:hover:bg-transparent transition-colors duration-300 relative group w-full lg:w-auto text-center">
              <button onClick={() => scrollToSection('contato')} className="tracking-widest uppercase focus:outline-none w-full py-4 lg:py-0">
                CONTATO
              </button>
              <span className="hidden lg:block absolute -bottom-2 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full"></span>
            </li>
          </ul>
        </nav>

      </div>
    </div>
  );
};

export default HomeNav;
