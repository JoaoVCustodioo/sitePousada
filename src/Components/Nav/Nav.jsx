import { FaPhone, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Nav = () => {
  return (
    <div className="bg-secondary text-white py-1.5 px-4 w-full fixed top-0 left-0 z-50 shadow-sm transition-all duration-300">
      <div className="flex justify-center sm:justify-between items-center max-w-7xl mx-auto text-[10px] sm:text-xs md:text-sm font-sans font-medium h-6">

        {/* Contact Info */}
        <div className="flex flex-row justify-center items-center gap-3 sm:gap-4 text-white/90">
          <div className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors cursor-pointer">
            <FaPhone size={11} className="sm:w-3.5 sm:h-3.5" />
            <a href="tel:+554733451821">(47) 3345-1821</a>
          </div>
          <span className="text-white/40">|</span>
          <div className="flex items-center gap-1 sm:gap-2 hover:text-white transition-colors cursor-pointer">
            <MdEmail size={13} className="sm:w-4 sm:h-4" />
            <a href="mailto:pousadarosalia@hotmail.com" className="hidden sm:inline-block">pousadarosalia@hotmail.com</a>
            <a href="mailto:pousadarosalia@hotmail.com" className="sm:hidden">E-mail</a>
          </div>
        </div>

        {/* Social Links (Right Side on Desktop/Tablets) */}
        <div className="hidden sm:flex items-center gap-4 justify-center text-white/90">
          <a
            href="https://www.instagram.com/pousadarosaliia/?hl=pt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors"
            title="Siga-nos no Instagram"
          >
            <FaInstagram size={15} />
            <span>@pousadarosaliia</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Nav;

