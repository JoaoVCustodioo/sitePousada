// import Swiper core and required modules
import { Navigation, Pagination} from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';



import cafe1 from "../../assets/images/cafe1.jpeg"
import cafe2 from "../../assets/images/cafe2.jpeg"
import cafe3 from "../../assets/images/cafe3.jpeg"


const slides = [
  cafe1,
  cafe2,
  cafe3
 ]


const SwiperCafe = () => {
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

export default SwiperCafe;
