import { useState, useEffect, useRef } from "react";
import Kombi from "../../assets/images/kombi.jpg";
import Parquinho from "../../assets/images/parquinho.JPG";
import Cafe from "../../assets/images/cafe.jpg";

const slides = [Kombi, Parquinho, Cafe];

const CustomSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Auto play
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
    }, 4000); // Muda a cada 4 segundos

    return () => clearInterval(timer);
  }, []);

  // Touch handlers
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    if (Math.abs(difference) > 50) { // Mínimo de 50px para considerar como swipe
      if (difference > 0) {
        // Swipe para esquerda
        setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
      } else {
        // Swipe para direita
        setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
      }
    }
  };

  return (
    <div className="relative w-full h-[400px] sm:h-[300px] md:h-[450px] lg:h-[600px] overflow-hidden mt-12">
      <div 
        className="flex transition-transform duration-500 ease-in-out h-full items-stretch cursor-grab active:cursor-grabbing" 
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full min-w-full h-full flex-shrink-0">
            <img 
              src={slide} 
              alt={`slide-${index}`} 
              className="w-full h-full object-cover object-center" 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomSwiper;
