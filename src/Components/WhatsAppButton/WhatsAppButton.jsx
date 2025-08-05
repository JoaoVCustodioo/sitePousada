import React from "react";
import botao from "../../assets/images/whatsappbotao.png"

const FloatingWhatsAppButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;


  return (
    <a
      href={whatsappLink}
      className="fixed bottom-4 right-4 md:bottom-20 md:right-8 bg-green-500 text-white p-3 md:p-4 rounded-full shadow-md hover:bg-green-600"
      style={{ zIndex: 9999 }}
    >
      
      <img
        src={botao}
        alt="WhatsApp"
        className="w-8 h-8 md:w-6 md:h-6"
      />
    </a>
  );
};

export default FloatingWhatsAppButton;
