import { Instagram } from "lucide-react";
import LogoPousada from "../../assets/images/logo-pousada.png";

const Footer = ({
  bgColorClass = "bg-primary",
  textColorClass = "text-dark",
  copyrightTextColorClass = "text-dark/60"
}) => {
  return (
    <footer className={`${bgColorClass} w-full py-12 md:py-20 border-t border-secondary/10`}>
      <div className={`mx-auto ${textColorClass} max-w-7xl px-6 md:px-12`}>
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-12 md:gap-8 text-center md:text-left">

          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <img src={LogoPousada} alt="Logo Pousada Rosália" className="h-16 md:h-20 mb-6 object-contain" />
            <p className="font-sans text-sm leading-relaxed max-w-sm">
              Tradição, conforto e a hospitalidade que você merece, a apenas 1km do maior parque temático da América Latina.
            </p>
          </div>

          <div className="flex w-full md:w-2/3 flex-col sm:flex-row justify-around gap-12 sm:gap-4">
            <div>
              <h3 className="text-secondary tracking-widest uppercase font-medium text-xs mb-4">Contato</h3>
              <p className="font-sans text-sm mb-2 hover:text-secondary transition-colors cursor-pointer">
                <a href="mailto:pousadarosalia@hotmail.com">pousadarosalia@hotmail.com</a>
              </p>
              <p className="font-sans text-sm mb-2">Telefone: <a href="tel:+554733451821" className="hover:text-secondary transition-colors">(47) 3345-1821</a></p>
              <p className="font-sans text-sm">WhatsApp: <a href="https://wa.me/554788059849" className="hover:text-secondary transition-colors">(47) 98805-9849</a></p>
            </div>

            <div>
              <h3 className="text-secondary tracking-widest uppercase font-medium text-xs mb-4">Endereço</h3>
              <p className="font-sans text-sm leading-relaxed">
                Rua Inácio Francisco <br /> de Souza, 208 <br />
                Bairro Armação <br />
                Penha/SC - Brasil
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-start">
              <h3 className="text-secondary tracking-widest uppercase font-medium text-xs mb-4">Redes Sociais</h3>
              <a
                href="https://www.instagram.com/pousadarosaliia/?hl=pt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-center items-center w-10 h-10 rounded-full bg-white shadow-sm hover:bg-secondary hover:text-white transition-all duration-300 text-secondary"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="w-full h-px bg-secondary/10 my-10 border-0"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-center">
          <p className={`${copyrightTextColorClass} font-sans text-xs tracking-wide`}>
            &copy; {new Date().getFullYear()} Pousada Rosália. Todos os direitos reservados.
          </p>
          <p className={`${copyrightTextColorClass} font-sans text-xs tracking-wide mt-2 md:mt-0`}>
            Criado com <span className="text-secondary border-b border-secondary/30 pb-0.5">carinho e dedicação</span> pela equipe Rosália.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;