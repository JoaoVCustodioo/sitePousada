import { useState, useEffect, useRef } from "react";
import Kombi from "../../assets/images/kombi.jpg";
import Parquinho from "../../assets/images/parquinho.JPG";
import Cafe from "../../assets/images/cafe.jpg";

const slides = [
  {
    image: Kombi,
    title: "Bem-vindo à Pousada Rosália",
    subtitle: "Tradição e conforto a apenas 1km do Beto Carrero World",
  },
  {
    image: Parquinho,
    title: "Diversão para a Família",
    subtitle: "Espaços pensados para o lazer de todas as idades",
  },
  {
    image: Cafe,
    title: "Café da Manhã Delicioso",
    subtitle: "Comece seu dia com energia e sabores caseiros",
  }
];

const RandomSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  // Touch handlers
  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) {
      if (difference > 0) setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      else setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    }
  };

  const scrollToQuartos = () => {
    const section = document.getElementById("quartos");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden mt-8 md:mt-12 group" data-aos="fade-up">
      <div
        className="flex transition-transform duration-700 ease-in-out h-full items-stretch cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full min-w-full h-full flex-shrink-0 relative">
            <div className="absolute inset-0 bg-black/40 z-10" />
            <img
              src={slide.image}
              alt={`slide-${index}`}
              className={`w-full h-full object-cover object-center transition-transform duration-[10000ms] ${currentIndex === index ? 'scale-110' : 'scale-100'}`}
            />

            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
              <h1
                className={`text-3xl md:text-5xl lg:text-7xl font-sans font-light tracking-wide text-white mb-4 transition-all duration-1000 transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                {slide.title}
              </h1>
              <p
                className={`text-sm md:text-xl lg:text-2xl font-sans text-white/90 mb-8 max-w-2xl transition-all duration-1000 delay-300 transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                {slide.subtitle}
              </p>
              <button
                onClick={scrollToQuartos}
                className={`bg-secondary hover:bg-[#74824d] text-white px-8 py-3 rounded-sm transition-all duration-1000 delay-500 uppercase tracking-widest text-sm hover:scale-105 transform ${currentIndex === index ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
              >
                Reservar Agora
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${currentIndex === index ? 'w-8 h-2 bg-secondary' : 'w-2 h-2 bg-white/50 hover:bg-white/80'}`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RandomSwiper;
