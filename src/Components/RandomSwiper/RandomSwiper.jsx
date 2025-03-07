import { useState } from "react";
import Kombi from "../../assets/images/kombi.jpg";
import Parquinho from "../../assets/images/parquinho.JPG";
import Cafe from "../../assets/images/cafe.jpg";

const slides = [Kombi, Parquinho, Cafe];

const CustomSwiper = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };
 
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-[350px] md:h-[450px] lg:h-[600px] overflow-hidden mt-12 ">
      <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {slides.map((slide, index) => (
          <img key={index} src={slide} alt={`slide-${index}`} className="w-full h-full object-cover  top-0 left-0" />
        ))}
      </div>

      {/* Botões de navegação */}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2  text-white px-3 py-2 rounded-full">
        ◀
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2  text-white px-3 py-2 rounded-full">
        ▶
      </button>
    </div>
  );
};

export default CustomSwiper;
