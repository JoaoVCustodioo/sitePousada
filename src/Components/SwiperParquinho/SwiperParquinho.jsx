// import Swiper core and required modules
import { Navigation, Pagination } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import parquinho from "../../assets/images/parquinho.JPG";
import parquinho3 from "../../assets/images/parquinho1.JPG";
import parquinho1 from "../../assets/images/parquinho2.jpg";
import parquinho2 from "../../assets/images/parquinho3.jpg";

const slides = [parquinho, parquinho2];

const SwiperParquinho = () => {
  return (
    <Swiper
      className="rounded-xl"
      modules={[Navigation, Pagination]}
      spaceBetween={2}
      slidesPerView={1}
      navigation
      pagination
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {slides.map((slide) => (
        <SwiperSlide>
          <img src={slide} alt={slides} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperParquinho;
