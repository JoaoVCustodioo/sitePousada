

import React from "react";
import botao from "../../assets/images/whatsappbotao.png"

const FloatingWhatsAppButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;


  return (
    <a
      href={whatsappLink}
      className="fixed bottom-20 right-2 bg-green-500 text-white p-4 rounded-full shadow-md hover:bg-green-600"
      style={{ zIndex: 9999 }}
    >
      
      <img
        src={botao}
        alt="WhatsApp"
        className="w-6 h-6"
      />
    </a>
  );
};

export default FloatingWhatsAppButton;
