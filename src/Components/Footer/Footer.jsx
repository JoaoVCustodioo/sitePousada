
import { Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-beige-100 w-full py-8 md:py-16">
      <div className="mx-auto text-secondary max-w-7xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {/* Coluna Endereço */}
          <div>
            <h3 className="  text-base md:text-lg mb-2">Endereço</h3>
            <p className=" text-sm md:text-base">
              Rua Inácio Francisco de Souza, 208 - <br />
              Penha/SC, Brasil
            </p>
          </div>

      
          <div>
            <h3 className="text-base md:text-lg mb-2">Email</h3>
            <p className=" text-sm md:text-base">
              pousadarosalia@hotmail.com
            </p>
          </div>

          
          <div>
            
            <p className="text-sm md:text-base">
              Telefone: (47) 3345-1821 <br />
              WhatsApp: (47) 98805-9849
            </p>
          </div>
        </div>

       

        {/* Direitos Autorais */}
        <div className="flex justify-center text-center mt-6">
          <p className="text-brown-600 text-sm">
            2025 - Pousada Rosália | Todos os direitos reservados. <br /> Site desenvolvido por nós mesmos :D
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;