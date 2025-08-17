import React from 'react';
import kombi from "../../assets/images/kombi.jpg";
import cafe from "../../assets/images/cafe.jpg";
import parquinho from "../../assets/images/parquinho.JPG";

const InfoSection = () => {
  // Array de dados para os cartões, com títulos, textos e imagens
  const cardsData = [
    {
      id: 1,
      title: "EXPERIÊNCIA",
      text: "A pousada oferece um parquinho infantil para as crianças, juntamente com uma área de descanso relaxante dos adultos.",
      image: parquinho,
      alt: "Experiência - Parquinho",
    },
    {
      id: 2,
      title: "CAFÉ DA MANHÃ",
      text: "O café da manhã, disponível das 08h às 10h, apresenta uma variedade de pães, frutas, bolos e salgados.",
      image: cafe,
      alt: "Café da Manhã",
    },
    {
      id: 3,
      title: "CORTESIA",
      text: "A Madagaskombi representa uma das atrações preferidas da pousada, sendo um kombi personalizada que leva, juntamente com guias experientes, ao Parque Beto Carrero World. Estamos à disposição 24h para transporte aos hóspedes conforme sua preferência de horário.",
      image: kombi,
      alt: "Cortesia - Transporte",
    },
  ];

  return (
    <div className="flex flex-col items-center py-8 md:py-14">
      <div className="max-w-[1600px] grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-20 px-2 md:px-4">
        {cardsData.map((card) => (
          <div
            key={card.id}
            data-aos="fade-up"
            data-aos-delay={card.id * 100}
            className="bg-primary rounded-3xl shadow-md p-2 md:p-4 flex flex-col items-center text-center border-2"
          >
            <img 
              src={card.image} 
              alt={card.alt} 
              className="w-full h-64 md:h-[28rem] object-cover rounded-3xl mb-4 mt-4"
            />
            <h3 className="text-xl md:text-3xl font-serif  text-secondary mt-5 mb-5 border-b-2 border-brown-600 ">{card.title}</h3>
            <p className="px-2 md:px-10 text-base md:text-xl font-body">{card.text}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 md:mt-24 text-center text-white text-lg md:text-2xl font-serif ">
        Além dessas opções, oferecemos estacionamento e Wi-Fi gratuitos.
      </p>
      <hr className="w-3/4 md:w-2/4 mx-auto mt-8 md:mt-12 h-[3px] border-0 bg-gradient-to-r from-transparent via-white to-transparent" />
    </div>
  );
};

export default InfoSection;