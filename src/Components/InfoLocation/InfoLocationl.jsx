import { FaMapMarkerAlt } from "react-icons/fa";

const InfoLocation = () => {
  return (
    <div className="w-full max-w-7xl mx-auto py-16 md:py-24 px-4 md:px-8" data-aos="fade-up">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

        {/* Text Details */}
        <div className="w-full lg:w-5/12 text-white">
          <h4 className="text-terciary font-sans font-medium tracking-widest uppercase text-sm mb-4">Como Chegar</h4>
          <h2 className="text-3xl md:text-5xl font-sans font-light mb-8">Nossa Localização</h2>

          <p className="text-white/80 text-base md:text-lg font-sans leading-relaxed mb-8">
            A pousada está perfeitamente situada em uma das avenidas mais conceituadas de Penha.
            Tudo o que você precisa a poucos passos: praias, mercados, farmácias, pizzarias, lanchonetes e padarias.
          </p>

          <div className="flex items-start gap-4 mb-10 bg-white/5 p-6 rounded-sm border border-white/10">
            <FaMapMarkerAlt className="text-white mt-1 shrink-0" size={24} />
            <div>
              <p className="text-white font-medium mb-1">Pousada Rosália</p>
              <p className="text-white/70 text-sm">Rua Inácio Francisco de Souza, 208</p>
              <p className="text-white/70 text-sm">Bairro Armação - Penha/SC</p>
            </div>
          </div>

          <a
            href="https://www.google.com/maps/place/?q=place_id:ChIJmYV7L7HR2JQRBFMaw9-GScg"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white text-dark hover:bg-dark hover:text-white text-sm tracking-widest uppercase font-medium px-8 py-4 rounded-sm transition-colors duration-300 w-full sm:w-auto text-center"
          >
            Abrir no Google Maps
          </a>
        </div>

        {/* Map Integration */}
        <div className="w-full lg:w-7/12 h-[400px] md:h-[500px] rounded-sm overflow-hidden shadow-xl ring-1 ring-white/10 group relative">
          <iframe
            title="Mapa da Pousada"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.498427952136!2d-48.611111!3d-26.786944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8d1e370baeb13%3A0x6eafdd201b2a970e!2sPousada%20Ros%C3%A1lia!5e0!3m2!1spt-BR!2sbr!4v1654123456789!5m2!1spt-BR!2sbr"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="filter grayscale-[20%] transition-all duration-500 group-hover:grayscale-0"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default InfoLocation;