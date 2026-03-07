import React from 'react';
import kombi from "../../assets/images/kombi.jpg";
import cafe from "../../assets/images/cafe.jpg";
import parquinho from "../../assets/images/parquinho.JPG";
import { FaWifi, FaCar } from "react-icons/fa";

const InfoSection = () => {
  const cardsData = [
    {
      id: 1,
      title: "Diversão e Descanso",
      subtitle: "Para todas as idades",
      text: "A pousada oferece um parquinho infantil para a diversão das crianças, além de uma área de descanso aconchegante para os adultos relaxarem com tranquilidade.",
      image: parquinho,
      alt: "Experiência - Parquinho",
    },
    {
      id: 2,
      title: "Café da Manhã",
      subtitle: "Saboroso e Variado",
      text: "Servido diariamente das 08h às 10h, nosso café da manhã apresenta uma rica variedade de pães frescos, frutas da estação, bolos caseiros e deliciosos salgados.",
      image: cafe,
      alt: "Café da Manhã",
    },
    {
      id: 3,
      title: "Transporte Cortesia",
      subtitle: "Nossa famosa Madagaskombi",
      text: "Uma de nossas atrações preferidas! Oferecemos transporte exclusivo e gratuito para o Parque Beto Carrero World, com flexibilidade para o seu dia.",
      image: kombi,
      alt: "Cortesia - Transporte",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-16 md:py-24">
      <div className="text-center mb-16 px-4">
        <h4 className="text-terciary font-sans font-medium tracking-widest uppercase text-sm mb-4">Experiências</h4>
        <h2 className="text-3xl md:text-5xl font-sans font-light text-white">Momentos Inesquecíveis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 px-4 md:px-8">
        {cardsData.map((card) => (
          <div
            key={card.id}
            data-aos="fade-up"
            data-aos-delay={card.id * 100}
            className="bg-primary rounded-sm overflow-hidden group hover:-translate-y-2 transition-transform duration-500 shadow-lg shadow-black/10"
          >
            <div className="relative h-64 md:h-72 overflow-hidden">
              <img
                src={card.image}
                alt={card.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="p-8 md:p-10 flex flex-col items-center text-center bg-white relative z-10 h-full">
              <h3 className="text-xl md:text-2xl font-sans text-dark mb-1">{card.title}</h3>
              <span className="text-xs uppercase tracking-widest text-secondary font-medium mb-6">{card.subtitle}</span>
              <p className="text-dark/70 text-sm leading-relaxed">{card.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 md:mt-28 w-full flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-16 text-white/90 px-4">
        <div className="flex items-center gap-4">
          <FaCar size={32} className="text-terciary" />
          <span className="font-sans font-light text-lg md:text-xl">Estacionamento Gratuito</span>
        </div>
        <div className="hidden sm:block w-px h-12 bg-white/20"></div>
        <div className="flex items-center gap-4">
          <FaWifi size={32} className="text-terciary" />
          <span className="font-sans font-light text-lg md:text-xl">Wi-Fi em toda a Pousada</span>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;