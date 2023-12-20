// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import kombi from "../../assets/images/kombi.jpg";

const slides = [kombi];

const SwiperMadagaskombi = () => {
  return (
    <Swiper
      className="rounded-xl"
      modules={[Navigation, Pagination]}
      spaceBetween={2}
      slidesPerView={1}
      navigation
      pagination
      onSwiper={(swiper) => swiper}
      onSlideChange={() => "slide change"}
    >
      {slides.map((slide) => (
        <SwiperSlide>
          <img src={slide} alt={slides} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperMadagaskombi;
