import Divider from "../Divider/Divider";
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-dimwhite w-screen py-8 md:py-16">
        <div className=" mx-auto">
          <div className=" flex flex-col items-center">
            <div className="mb-2">
              <p className="text-sm md:text-xl">
                Email - pousadarosalia@hotmail.com
              </p>
            </div>

            <div className="mb-2">
              <p className="text-sm md:text-xl">Telefone - 47 3345 1821</p>
            </div>

            <div className="mb-2">
              <p className="text-sm md:text-xl">WhatsApp - 47 98805 9849</p>
            </div>

            <div className="mb-2">
              <p className="text-sm md:text-base">Rua Inácio Francisco de Souza, 123 - Armação - Penha</p>
            </div>
            <div className="mb-2 flex items-center" >

            <Instagram size={20} className="mr-1" />
              
              <a
                href="https://www.instagram.com/pousadarosaliia/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm md:text-base hover:underline"
              >

                 @pousadarosaliia 
              </a>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex justify-center text-center ">
          <h1 className="text-sm">
            2023 - Pousada Rosália | Todos os direitos reservados. <br />
            Site desenvolvido por nós mesmos :)
          </h1>
        </div>
      </footer>
    </>
  );
};

export default Footer;
