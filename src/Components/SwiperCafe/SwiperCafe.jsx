// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import cafe1 from "../../assets/images/cafe1.jpeg";
import cafe2 from "../../assets/images/cafe2.jpeg";
import cafe3 from "../../assets/images/cafe3.jpeg";

const slides = [cafe1, cafe2, cafe3];

const SwiperCafe = () => {
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

export default SwiperCafe;
