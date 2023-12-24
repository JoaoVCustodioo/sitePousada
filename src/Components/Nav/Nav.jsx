import LogoPousada from "../../assets/images/logo-pousada.png";

const Nav = () => {
  {/*const [isOpen, setIsOpen] = useState(false);

  const toggleNavBar = () => {
    setIsOpen(!isOpen);
  };*/}

  return (
    <>
      <nav className=" bg-primary shadow md:flex md:items-center  md:justify-between">
        <div className="flex justify-between items-center">
          <span className="cursor-pointer">
            <img
              className="h-14 inline "
              src={LogoPousada}
              alt="Logo Pousada"
            />
          </span>

          {/*<div>
            <button className="p-4 md:hidden" onClick={toggleNavBar}>
              {isOpen ? <X /> : <Menu />}
            </button>
  </div> */}

          
       </div>
        {/*{isOpen && (
          <div>
            <ul className="md:flex md:items-center z-[2] md:z-auto md:static absolute  bg-primary w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 md:opacity-100  top-[-100] ">
              
              <li className="mx-4 my-6 md:my-0">
                <a href="#quartos" className="text-xl hover:text-white duration-500">
                  Suítes
                </a>
              </li>
              <li className="mx-4 my-6 md:my-0">
                <a href="#madagaskombi" className="text-xl hover:text-white duration-500">
                  Madagaskombi
                </a>
              </li>
              
              <li className="mx-4 my-6 md:my-0">
                <a href="#contato" className="text-xl hover:text-white duration-500">
                  Localização
                </a>
              </li>
            </ul>
          </div>
        )}*/}
      </nav>
    </>
  );
};

export default Nav;
