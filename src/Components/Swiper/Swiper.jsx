// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import Kombi from "../../assets/images/kombi.jpg"
import Parquinho from "../../assets/images/parquinho.JPG"
import Cafe from "../../assets/images/cafe.jpg"


import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';


const slides = [
  Cafe,
  Kombi,
  Parquinho
 ]


export default () => {
  return (
    <Swiper className= 'rounded-xl'

      modules={[Navigation, Pagination ]}
      spaceBetween={2}
      slidesPerView={1}
      navigation
      pagination 
  
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
     {slides.map(slide => (
        <SwiperSlide>
          <img src= {slide} alt={slides} />
        </SwiperSlide>
        
     ))}
       
        
      
    </Swiper>

    
  );
};