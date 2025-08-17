import { FaPhone, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Nav = () => {
  return (
    <div className="bg-secondary border-b-2 border-b-black text-white py-1 px-2 w-full fixed top-0 left-0 z-50">
      <div className="flex flex-row justify-center items-center gap-4 text-xs sm:text-sm md:text-base h-8 md:h-12 max-w-full mx-auto">
        {/* Telefone */}
        <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <FaPhone />
          <span>(47) 3345-1821</span>
        </div>
        {/* Separador */}
        <span className="hidden sm:inline-block">|</span>
        {/* Email */}
        <div className="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
          <MdEmail />
          <span>pousadarosalia@hotmail.com</span>
        </div>
        {/* Separador */}
        <span className="hidden sm:inline-block">|</span>
        {/* Instagram */}
        <a 
          href="https://www.instagram.com/pousadarosaliia/?hl=pt" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-1 sm:gap-2 hover:opacity-80 transition-opacity"
        >
          <FaInstagram size={18} />
        </a>
      </div>
    </div>
  );
};

export default Nav;

