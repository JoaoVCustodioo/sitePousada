import React from 'react';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const FeedbackText = () => {
  return (
    <div className="w-full flex flex-col md:flex-row gap-8 lg:gap-12 items-stretch justify-center">
      <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-secondary/10 w-full md:w-1/2 flex flex-col">
        <FaQuoteLeft className="text-secondary/20 mb-6" size={40} />
        <p className="text-dark/70 text-sm md:text-base leading-relaxed mb-8 flex-grow">
          "A pé a Pousada Rosália fica a 5 minutos da praia e a menos de 5 minutos de ampla rede de comércio incluindo mercado, farmácia, dezenas de restaurantes dentre os quais alguns incríveis, além disso está a 4 minutos do Beto Carrero World translado rápido que você faz a bordo da Madagaskombi, uma das kombis mais charmosas e divertidas que já vi no Brasil. A pousada em si é um charme. Vemos o capricho e cuidado em cada detalhe. Quarto confortável, café da manhã impecável e com tudo o que precisamos em viagens como essa. Gostamos muito de tudo e deixamos aqui nosso agradecimento."
        </p>
        <div>
          <div className="flex text-secondary mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} size={16} />
            ))}
          </div>
          <h3 className="text-lg font-sans font-medium text-dark">Rodrigo Capitano</h3>
        </div>
      </div>

      <div className="bg-white p-8 md:p-10 rounded-sm shadow-sm border border-secondary/10 w-full md:w-1/2 flex flex-col">
        <FaQuoteLeft className="text-secondary/20 mb-6" size={40} />
        <p className="text-dark/70 text-sm md:text-base leading-relaxed mb-8 flex-grow">
          "A pousada Rosália é, para mim, a melhor pousada de Penha! Possuem além de uma estrutura muito boa, um atendimento espetacular, me sinto em casa quando vou para lá, sempre muito bem recebido e acolhido por eles. Com toda a certeza do mundo recomendo que, as pessoas que gostariam de visitar o Beto Carreiro ou apenas ir para Penha, fiquem nessa pousada, para se ter ideia, eles possuem até transporte até o parque, a localização é excelente!"
        </p>
        <div>
          <div className="flex text-secondary mb-2">
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} size={16} />
            ))}
          </div>
          <h3 className="text-lg font-sans font-medium text-dark">Bernardo Kowalsky</h3>
        </div>
      </div>
    </div>
  );
};

export default FeedbackText;