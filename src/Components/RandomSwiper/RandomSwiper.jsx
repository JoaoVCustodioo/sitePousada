
import { Navigation, Pagination} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import Kombi from "../../assets/images/kombi.jpg"
import Parquinho from "../../assets/images/parquinho.JPG"
import Cafe from "../../assets/images/cafe.jpg"


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const slides = [
  Kombi,
  Parquinho,
  Cafe
 ]


const RandomSwiper = () => {
  return (
    <Swiper className= 'rounded-xl  lg:w-2/6'

      modules={[Navigation, Pagination ]}
      spaceBetween={2}
      slidesPerView={1}
      navigation
      pagination 
  
      onSwiper={(swiper) =>  (swiper)}
      onSlideChange={() =>  ('slide change')}
    >
     {slides.map((slide, index) => (
        <SwiperSlide key={index}>
          <img src= {slide} alt={`slide-${index}`} />
        </SwiperSlide>
        
     ))}
       
        
      
    </Swiper>

    
  );
};

export default RandomSwiper;