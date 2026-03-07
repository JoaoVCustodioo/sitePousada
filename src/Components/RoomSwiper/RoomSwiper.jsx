import { useState, useRef, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RoomSwiper = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) setCurrentIndex((p) => (p === slides.length - 1 ? 0 : p + 1));
      else setCurrentIndex((p) => (p === 0 ? slides.length - 1 : p - 1));
    }
  };

  const prev = () => setCurrentIndex((p) => (p === 0 ? slides.length - 1 : p - 1));
  const next = () => setCurrentIndex((p) => (p === slides.length - 1 ? 0 : p + 1));

  return (
    <div className="relative w-full h-full overflow-hidden group">
      {/* Slides */}
      <div
        className="flex transition-transform duration-600 ease-in-out h-full cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full min-w-full h-full flex-shrink-0">
            <img src={slide} alt={`Foto ${index + 1}`} className="w-full h-full object-cover object-center" loading="lazy" />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-dark/60 hover:text-dark opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm" aria-label="Anterior">
        <FaChevronLeft size={12} />
      </button>
      <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-dark/60 hover:text-dark opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm" aria-label="Próxima">
        <FaChevronRight size={12} />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${currentIndex === index ? "w-6 h-1.5 bg-secondary" : "w-1.5 h-1.5 bg-white/50"
              }`}
            aria-label={`Foto ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomSwiper;
