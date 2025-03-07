import React from 'react';
import LogoPousada from "../../assets/images/logo-pousada.png"; // Verifique se o caminho está correto
import FotoQuartoMain from "../../assets/images/fotoNossosQuartosMain.jpg"; // Verifique se o caminho está correto

const RoomsInfo = ({ className = "" }) => { // Adicione props className para aceitar classes externas
  return (
    <>
      <div className={`flex justify-center mb-4 ${className}`}>
        <img src={LogoPousada} alt="Logo da Pousada Rosália" className="h-40" />
      </div>
      <section className="py-8 w-7/12 mx-auto"> {/* Mantive mx-auto para centralizar a section */}
  <div className="relative bg-beige-100 p-4 h-[600px]">
    <img 
      src={FotoQuartoMain}
      alt="Nossos Quartos" 
      className="w-full h-full rounded-3xl object-cover opacity-50"
    />
    <div className="absolute inset-0 flex flex-col  gap-20 items-start justify-center text-left text-secondary pl-16"> {/* Alterei para items-start, text-left, e adicionei pl-8 para padding esquerdo */}
      <h2 className="text-5xl font-bold ">Nossos Quartos</h2>
      <p className="text-3xl max-w-xl">
        A nossa pousada disponibiliza quartos que vão desde duplos até quíntuplos, todos equipados com frigobar, ar-condicionado e televisão.
      </p>
      <button className="mt-6 bg-secondary text-white text-2xl font-bold px-6 py-2 rounded-full hover:bg-brown-600 transition">
        Veja mais
      </button>
    </div>
  </div>
</section>
    </>
  );
};

export default RoomsInfo;