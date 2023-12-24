// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import quarto1 from "../../assets/images/quarto1 (1).jpg";
import quarto13 from "../../assets/images/quarto1(2).jpg";
import quarto14 from "../../assets/images/quarto1(3).jpg";
import quarto12 from "../../assets/images/quarto1(4).jpg";

const slides = [quarto1, quarto12, quarto13, quarto14];

const SwiperQuartos = () => {
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

export default SwiperQuartos;
