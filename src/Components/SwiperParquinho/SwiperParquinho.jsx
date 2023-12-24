// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import parquinho from "../../assets/images/parquinho.JPG";

import parquinho2 from "../../assets/images/parquinho3.jpg";

const slides = [parquinho, parquinho2];

const SwiperParquinho = () => {
  return (
   
   
    <Swiper
      className="rounded-xl lg:w-2/6"
      modules={[Navigation, Pagination]}
      spaceBetween={2}
      slidesPerView={1}
      navigation
      pagination
      onSwiper={(swiper) => swiper}
      onSlideChange={() => "slide change"}
    >
      {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src={slide} alt={`slide-${index}`} />
        </SwiperSlide>
      ))}
    </Swiper>

    
  );
};

export default SwiperParquinho;
