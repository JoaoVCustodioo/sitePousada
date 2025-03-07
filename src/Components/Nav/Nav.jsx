import { FaPhone, FaInstagram } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Nav = () => {
  return (
    <div className="bg-secondary border-b-2 border-b-black h-16 text-white py-2  px-80 flex justify-between items-center text-base w-full fixed top-0 left-0 z-50">
      {/* Telefone e Email */}
      <div className="flex items-center gap-16">
        <div className="flex items-center gap-2">
          <FaPhone />
          <span>(47) 3345-1821</span>
        </div>
        <div className="flex items-center gap-2">
          <MdEmail />
          <span>pousadarosalia@hotmail.com</span>
        </div>
      </div>

      {/* Instagram */}
      <div>
        <FaInstagram size={24}/>
      </div>
    </div>
  );
};

export default Nav;
