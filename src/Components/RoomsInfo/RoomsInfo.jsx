import React from 'react';
import { Link } from 'react-router-dom';
import FotoQuartoMain from "../../assets/images/fotoNossosQuartosMain.jpg";
import { FaWifi, FaSnowflake, FaTv } from "react-icons/fa";

const RoomsInfo = ({ className = "" }) => {
  return (
    <section className={`py-16 md:py-24 w-full max-w-7xl mx-auto px-4 md:px-8 ${className}`} data-aos="fade-up">
      <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">

        {/* Image Section */}
        <div className="w-full md:w-1/2 relative group">
          <div className="absolute inset-0 bg-secondary/20 transform translate-x-4 translate-y-4 md:translate-x-6 md:translate-y-6 -z-10 rounded-sm transition-transform duration-500 group-hover:translate-x-2 group-hover:translate-y-2"></div>
          <img
            src={FotoQuartoMain}
            alt="Nossos Quartos"
            className="w-full h-[400px] md:h-[500px] object-cover rounded-sm shadow-sm"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h4 className="text-secondary font-sans font-medium tracking-widest uppercase text-sm mb-4">Acomodações</h4>
          <h2 className="text-3xl md:text-5xl font-sans font-light text-dark mb-6">Conforto para seu descanso</h2>
          <p className="text-base md:text-lg text-dark/70 font-sans leading-relaxed mb-8">
            Nossa pousada disponibiliza quartos que vão desde opções duplas até quíntuplas. Todos os ambientes foram cuidadosamente montados para garantir que suas noites de sono sejam revigorantes após um dia de diversão e passeios.
          </p>

          <div className="flex flex-wrap gap-6 mb-10 text-secondary">
            <div className="flex flex-col items-center gap-2">
              <FaSnowflake size={24} />
              <span className="text-xs uppercase tracking-wider font-medium text-dark/60">Climatizado</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaTv size={24} />
              <span className="text-xs uppercase tracking-wider font-medium text-dark/60">TV</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="border-2 border-current rounded-sm w-6 h-6 flex items-center justify-center">
                <span className="text-[10px] font-bold">FR</span>
              </div>
              <span className="text-xs uppercase tracking-wider font-medium text-dark/60">Frigobar</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <FaWifi size={24} />
              <span className="text-xs uppercase tracking-wider font-medium text-dark/60">Wi-Fi Livre</span>
            </div>
          </div>

          <Link
            to="/Acomodacoes"
            onClick={() => window.scrollTo(0, 0)}
            className="inline-block border border-secondary text-secondary hover:bg-secondary hover:text-white text-sm tracking-widest uppercase font-medium px-8 py-3 rounded-sm transition-colors duration-300"
          >
            Explorar Quartos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RoomsInfo;