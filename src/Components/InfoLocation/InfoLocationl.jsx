

const InfoLocation = () => {
  return (
    <div className="min-h-[24rem] flex flex-col items-center justify-center text-white text-center p-6">
      <h1 className="text-7xl font-serif  mb-16">LOCALIZAÇÃO</h1>
      <p className=" w-2/6 text-2xl mb-24">
        A pousada está situada em uma das avenidas mais conceituadas de Penha, com proximidade de praia, mercado, farmácia, pizzaria, pastelaria, hamburgueria e padaria.
      </p>
      <p className="text-2xl mb-24">
        Rua Inácio Francisco de Souza, 208 - Bairro Armação - Penha/SC
      </p>
      <a
        href="https://www.google.com/maps/place/?q=place_id:ChIJmYV7L7HR2JQRBFMaw9-GScg"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-2xl text-brown-800 font-serif py-2 px-6 rounded-full hover:bg-primary transition duration-300"
      >
        VEJA COMO CHEGAR
      </a>
    </div>
  );
};

export default InfoLocation;