import { Link } from "react-router-dom";
import LogoPousada from "../../assets/images/logo-pousada.png";

const HomeNav = () => {
  return (
    <div className=" md:mt-12 px-2 md:px-6 flex flex-col items-center">
      <img src={LogoPousada} alt="Logo Pousada" className="h-24 md:h-40 mb-2" />
      <nav>
        <ul className="flex flex-wrap gap-6 md:gap-20 text-base md:text-2xl font-serif tracking-wide text-gray-800 justify-center">
          <li className="cursor-pointer hover:underline">
          <Link to="/Home">HOME</Link>
          </li>
          <li className="cursor-pointer hover:underline">
            <Link to="/Acomodacoes">ACOMODAÇÕES</Link>
          </li>
          <li className="cursor-pointer hover:underline">EXPERIÊNCIAS</li>
          <li className="cursor-pointer hover:underline">LOCALIZAÇÃO</li>
          <li className="cursor-pointer hover:underline">CONTATO</li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeNav;
