import React from 'react';

const FeedbackText = () => {
  return (
    <div className="min-h-[24rem] gap-56 flex flex-row items-start justify-center mt-20">
      <div className="p-6 w-full max-w-md text-center">
        <h2 className="text-4xl font-bold text-brown-800 mb-4">Rodrigo Capitano</h2>
        <p className="text-brown-600 text-lg mb-4">
        A pé a Pousada Rosália fica a 5 minutos da praia e a menos de 5 minutos de ampla rede de comércio incluindo mercado, farmácia, dezenas de restaurantes dentre os quais alguns incríveis, além disso está a 4 minutos do Beto Carrero World translado rápido que você faz a bordo da Madagaskombi, uma das kombis mais charmosas e divertidas que já vi no Brasil. A pousada em si é u charme. Vemos o capricho e cuidado em cada detalhe. Quarto confortável, café da manhã impecável e com tudo o que precisamos em viagens como essa. Gostamos muito de tudo e deixamos aqui nosso agradecimento para Neia e Tio Mika que nos receberam de forma tão acolhedora.
        </p>
        <div className="flex justify-center">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-yellow-500 text-6xl">★</span>
          ))}
        </div>
      </div>

      <div className="p-6 w-full max-w-md text-center">
        <h2 className="text-4xl font-bold text-brown-800 mb-4">Bernardo Kowalsky</h2>
        <p className="text-brown-600 text-lg mb-4">
        A pousada Rosália é, para mim, a melhor pousada de Penha! Possuem além de uma estrutura muito boa, um atendimento espetacular, me sinto em casa quando vou para lá, sempre muito bem recebido e acolhido por eles. Com toda a certeza do mundo recomendo que, as pessoas que gostariam de visitar o Beto Carreiro ou apenas ir para Penha, fiquem nessa pousada, para se ter ideia, eles possuem até transporte até o parque, a localização é excelente!
        </p>
        <div className="flex justify-center">
          {[...Array(5)].map((_, index) => (
            <span key={index} className="text-yellow-500 text-6xl">★</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeedbackText;