const Mapa = () => {
  const consultarMapa = () => {
    const mapLink = `https://www.google.com/maps/dir/-26.7897705,-48.6088232/Pousada+Ros%C3%A1lia+-+Rua+In%C3%A1cio+Francisco+de+Souza+-+Praia+de+Arma%C3%A7%C3%A3o+do+Itapocor%C3%B3i,+Penha+-+State+of+Santa+Catarina/@-26.7914058,-48.6098773,17z/data=!3m1!4b1!4m9!4m8!1m1!4e1!1m5!1m1!1s0x94d8d1b12f7b8599:0xc84986dfc31a5304!2m2!1d-48.6058998!2d-26.7930508?entry=ttu`;

    window.open(mapLink, "_blank");
  };

  return (
    <>
    <div className="flex items-center justify-center">
      <button className="bg-primary text-black font-light py-2 px-4 rounded" onClick={consultarMapa}>Consulte o mapa</button>
    </div>
    </>
  );
};

export default Mapa;
