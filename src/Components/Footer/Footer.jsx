// src/Components/Footer/Footer.jsx

import { Instagram } from "lucide-react";

// Aceita props para a classe do background e das cores do texto
const Footer = ({
  bgColorClass = "bg-beige-100", // Valor padrão para background claro
  textColorClass = "text-secondary", // Valor padrão para texto escuro
  copyrightTextColorClass = "text-brown-600" // Valor padrão para texto de copyright
}) => {
  return (
    <footer className={`${bgColorClass} w-full py-6 md:py-10`}>
      <div className={`mx-auto ${textColorClass} max-w-7xl px-2 md:px-4`}>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-8 text-center">
          {/* Coluna Endereço */}
          <div>
            <h3 className="text-xs md:text-sm mb-1">Endereço</h3>
            <p className="text-xs md:text-sm leading-tight">
              Rua Inácio Francisco de Souza, 208 -<br />
              Penha/SC, Brasil
            </p>
          </div>
          <div className="hidden md:block h-8 border-l border-brown-600 mx-2"></div>
          <div>
            <h3 className="text-xs md:text-sm mb-1">Email</h3>
            <p className="text-xs md:text-sm leading-tight">
              pousadarosalia@hotmail.com
            </p>
          </div>
          <div className="hidden md:block h-8 border-l border-brown-600 mx-2"></div>
          <div>
            <p className="text-xs md:text-sm leading-tight">
              Telefone: (47) 3345-1821 <br />
              WhatsApp: (47) 98805-9849
            </p>
          </div>
        </div>
        {/* Direitos Autorais */}
        <div className="flex justify-center text-center mt-4">
          <p className={`${copyrightTextColorClass} text-xs`}>
            2025 - Pousada Rosália | Todos os direitos reservados. <br /> Site desenvolvido por nós mesmos :D
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;