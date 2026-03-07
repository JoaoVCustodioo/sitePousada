import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsAppButton = ({ phoneNumber }) => {
  const whatsappLink = `https://wa.me/${phoneNumber}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 z-50 flex items-center justify-center group"
      aria-label="Fale conosco no WhatsApp"
    >
      <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
      <FaWhatsapp className="w-8 h-8 md:w-9 md:h-9 relative z-10" />

      <span className="absolute right-full mr-4 bg-white text-dark text-sm font-sans font-medium px-4 py-2 rounded-sm shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-black/5">
        Fale conosco!
      </span>
    </a>
  );
};

export default FloatingWhatsAppButton;
