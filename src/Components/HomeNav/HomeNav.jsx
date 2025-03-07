import LogoPousada from "../../assets/images/logo-pousada.png";

const HomeNav = () => {
  return (
    <div className=" mt-12 px-6 flex flex-col items-center">
      {/* Logo Centralizada */}
      <img src={LogoPousada} alt="Logo Pousada" className="h-40 mb-2" />

      {/* Links de Navegação */}
      <nav>
        <ul className="flex gap-20 text-2xl font-serif tracking-wide text-gray-800">
          <li className="cursor-pointer hover:underline">HOME</li>
          <li className="cursor-pointer hover:underline">ACOMODAÇÕES</li>
          <li className="cursor-pointer hover:underline">EXPERIÊNCIAS</li>
          <li className="cursor-pointer hover:underline">LOCALIZAÇÃO</li>
          <li className="cursor-pointer hover:underline">CONTATO</li>
        </ul>
      </nav>
    </div>
  );
};

export default HomeNav;
