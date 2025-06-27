import RoomSwiper from "../RoomSwiper/RoomSwiper";
import camaCasal from "../../assets/images/camaCasal.png";
import camaSolteiro from "../../assets/images/camaSolteiro.png";
import beliche from "../../assets/images/beliche.png";
import people from "../../assets/images/people.png"

// Duplo
import duplo from '../../assets/images/Duplo/duploFoto.jpeg';
import duplo1 from '../../assets/images/Duplo/duploFoto1.jpeg';
import duplo2 from '../../assets/images/Duplo/duploFoto2.jpeg';

// Triplo
import triplo from '../../assets/images/Triplo/triplo.jpeg';
import triplo1 from '../../assets/images/Triplo/triplo1.jpeg';
import triplo2 from '../../assets/images/Triplo/triplo2.jpeg';

// Quadruplo
import quadruplo from '../../assets/images/Quadruplo/quadruplo.jpeg';
import quadruplo1 from '../../assets/images/Quadruplo/quadruplo1.jpeg';
import quadruplo2 from '../../assets/images/Quadruplo/quadruplo2.jpeg';
import quadruplo4 from '../../assets/images/Quadruplo/quadruplo4.jpeg';
import quadruplo5 from '../../assets/images/Quadruplo/quadruplo5.jpeg';

// Triplo Varanda
import triploVaranda from '../../assets/images/TriploVaranda/triploVaranda.jpeg';
import triploVaranda1 from '../../assets/images/TriploVaranda/triploVaranda1.jpeg';
import triploVaranda2 from '../../assets/images/TriploVaranda/triploVaranda2.jpeg';
import triploVaranda3 from '../../assets/images/TriploVaranda/triplovaranda3.jpeg';

// Quadruplo Varanda
import quadruploVaranda from '../../assets/images/QuadruploVaranda/quadruploVaranda.jpeg';
import quadruploVaranda1 from '../../assets/images/QuadruploVaranda/quadruploVaranda1.jpeg';
import quadruploVaranda2 from '../../assets/images/QuadruploVaranda/quadruploVaranda2.jpeg';

// Quintuplo Varanda
import quintuplo from '../../assets/images/QuintuploVaranda/quintuplo.jpeg';
import quintuplo1 from '../../assets/images/QuintuploVaranda/quintuplo1.jpeg'
import quintuplo2 from '../../assets/images/QuintuploVaranda/quintuplo2.jpeg'
import quintuplo3 from '../../assets/images/QuintuploVaranda/quintuplo3.jpeg'

const Rooms = () => {
  const quartosData = [
    {
      tipo: 'Quarto Duplo',
      subtipo: 'Sem varanda',
      descricao:
        'O quarto duplo é equipado com uma confortável cama de casal, frigobar, toalhas macias, TV e roupa de cama completa. Conta também com ar-condicionado quente e frio, garantindo a temperatura ideal para qualquer estação do ano.',
      pessoas: '2 pessoas',
      cama: 'Cama casal',
      fotos: [duplo, duplo1, duplo2],
      claro: false,
    },
    {
      tipo: 'Quarto Triplo',
      subtipo: 'Sem varanda',
      descricao:
        'O quarto triplo é equipado com uma confortável cama de casal e uma cama de solteiro, frigobar, toalhas macias, TV e roupa de cama completa. Conta também com ar-condicionado quente e frio, garantindo a temperatura ideal para qualquer estação do ano.',
      pessoas: '3 pessoas',
      cama: 'Cama casal + Cama solteiro',
      fotos: [triplo, triplo1, triplo2],
      claro: true,
    },
    {
      tipo: 'Quarto Triplo',
      subtipo: 'Com varanda',
      descricao:
        'O quarto triplo com varanda é ideal para quem busca ainda mais conforto. Equipado com cama de casal e cama de solteiro, ar-condicionado quente e frio, frigobar e TV.',
      pessoas: '3 pessoas',
      cama: 'Cama casal + Cama solteiro',
      fotos: [triploVaranda, triploVaranda1, triploVaranda2, triploVaranda3],
      claro: false,
    },
    {
      tipo: 'Quarto Quádruplo',
      subtipo: 'Sem varanda',
      descricao:
        'Perfeito para famílias, esse quarto possui cama de casal e camas de solteiro, além de frigobar, ar-condicionado, TV e mais.',
      pessoas: '4 pessoas',
      cama: 'Cama casal + 2 Camas solteiro',
      fotos: [quadruplo, quadruplo1, quadruplo2, quadruplo4, quadruplo5],
      claro: true,
    },
    {
      tipo: 'Quarto Quádruplo',
      subtipo: 'Com varanda',
      descricao:
        'Espaçoso e com varanda, esse quarto acomoda até quatro pessoas com muito conforto e praticidade.',
      pessoas: '4 pessoas',
      cama: 'Cama casal + 2 Camas solteiro',
      fotos: [quadruploVaranda, quadruploVaranda1, quadruploVaranda2],
      claro: false,
    },
    {
      tipo: 'Quarto Quíntuplo',
      subtipo: 'Com varanda',
      descricao:
        'Nosso maior quarto, ideal para grupos maiores ou famílias grandes, com varanda e todo o conforto necessário.',
      pessoas: '5 pessoas',
      cama: 'Cama casal + 3 Camas solteiro',
      fotos: [quintuplo, quintuplo1, quintuplo2, quintuplo3],
      claro: true,
    },
  ];

  return (
  <div className="w-full">
    {/* Título e Introdução */}
    <div className="bg-gradient-to-b from-yellow-300 to-yellow-100 py-12 text-center">
      <h2 className="text-5xl font-serif text-brown-800 mb-2">ACOMODAÇÕES</h2>
      <p className="italic text-xl text-brown-700">Pousada Rosália</p>
    </div>

    <div className="bg-primary px-6 py-10 max-w-5xl mx-auto text-brown-800 text-justify text-lg leading-relaxed">
      <p>
        Nossa pousada oferece quartos duplos, triplos, quádruplos e quíntuplos. Ideais para casais, famílias ou grupos de amigos que procuram conforto e tranquilidade.
      </p>
      <p className="mt-4">
        Pensamos em cada detalhe para que você se sinta em casa, com comodidade, praticidade e um ambiente aconchegante.
      </p>
    </div>

    {/* Quartos */}
    {quartosData.map((quarto, index) => {
      
      const bgClass = quarto.claro ? 'bg-primary' : 'bg-secondary';
      const textClass = quarto.claro ? 'text-brown-800' : 'text-white';
      const borderClass = quarto.claro ? 'border-secondary' : 'border-primary';

      return (
        <div key={`${quarto.tipo}-${index}`} className={`${bgClass} w-full`}>
          <div className="flex flex-col md:flex-row w-full max-w-[1800px] mx-auto p-8 md:p-16 gap-6 md:gap-12 items-center">
            {/* Swiper de Imagens */}
            <div className={`w-full md:w-1/2 border-[16px] ${borderClass} `}>
              <RoomSwiper slides={quarto.fotos} />
            </div>

            {/* Informações do Quarto */}
            <div className={`w-full md:w-1/2 ${textClass}`}>
              <h3 className="text-3xl font-bold mb-1">{quarto.tipo}</h3>
              <p className="text-xl">{quarto.subtipo}</p>
              <p className="mb-6">{quarto.descricao}</p>
              <div className="flex items-center gap-8 text-sm font-semibold">
                <div className="flex items-center gap-2">
                  <img src={camaCasal} alt="Cama" className="w-16 h-16" />
                  <span>{quarto.cama}</span>
                </div>
                <div className="flex items-center gap-2">
                  <img src={people} alt="Pessoas" className="w-16 h-16" />
                  <span>{quarto.pessoas}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
);
};

export default Rooms;