import React from 'react';
import { Link } from 'react-router-dom';
import LogoPousada from "../../assets/images/logo-pousada.png"; // Verifique se o caminho está correto
import FotoQuartoMain from "../../assets/images/fotoNossosQuartosMain.jpg"; // Verifique se o caminho está correto

const RoomsInfo = ({ className = "" }) => { // Adicione props className para aceitar classes externas
  return (
    <>
      <div className={`flex justify-center mb-4 ${className}`}>
        <img src={LogoPousada} alt="Logo da Pousada Rosália" className="h-24 md:h-40" />
      </div>
      <section className="py-8 w-full md:w-10/12 lg:w-7/12 mx-auto" data-aos="fade-up">
        <div className="relative bg-beige-100 p-2 md:p-4 h-[350px] md:h-[600px]">
          <img 
            src={FotoQuartoMain}
            alt="Nossos Quartos" 
            className="w-full h-full rounded-3xl object-cover opacity-50"
          />
          <div className="absolute inset-0 flex flex-col gap-8 md:gap-20 items-start justify-center text-left text-secondary pl-4 md:pl-16">
            <h2 className="text-2xl md:text-5xl font-bold ">Nossos Quartos</h2>
            <p className="text-base md:text-3xl max-w-xl">
              A nossa pousada disponibiliza quartos que vão desde duplos até quíntuplos, todos equipados com frigobar, ar-condicionado e televisão.
            </p>
            <Link 
              to="/Acomodacoes" 
              onClick={() => window.scrollTo(0, 0)}
              className="mt-6 bg-secondary text-white text-base md:text-2xl font-bold px-4 md:px-6 py-2 rounded-full hover:bg-brown-600 transition"
            >
              Veja mais
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default RoomsInfo;