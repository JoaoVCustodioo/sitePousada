import Nav from "../../Components/Nav/Nav";
import PrincipalText from "../../Components/PrincipalTexts/PrincipalTexts";
import Footer from "../../Components/Footer/Footer";
import WhatsAppButton from "../../Components/WhatsAppButton/WhatsAppButton";
import RandomSwiper from "../../Components/RandomSwiper/RandomSwiper";
import HomeNav from "../../Components/HomeNav/HomeNav";
import RoomsInfo from "../../Components/RoomsInfo/RoomsInfo";
import InfoSection from "../../Components/InfoSection/InfoSection";
import Feedback from "../../Components/Feedback/Feedback";
import InfoLocation from "../../Components/InfoLocation/InfoLocationl";



export const Home = () => {

  const whatsNumber = 554788059849

  return (
    <>
       <Nav />
      
      <div className=" lg:flex lg:flex-col lg:items-center mt-5">
        <HomeNav />
        <RandomSwiper />
        <PrincipalText>Localizada a 1 km do parque Beto Carrero World, a Pousada Rosália é cuidada por uma família nativa que vive na cidade há mais de 50 anos. <br />
        O tio Mica e a Tia Néia são os proprietários da pousada, sempre fazendo o máximo para com que seus hóspedes se sintam em casa.</PrincipalText>
      </div>

      <div id="quartos" className="bg-primary lg:flex lg:flex-col lg:items-center">
          <RoomsInfo className="w-full p-0 bg-beige-100" />
      </div>  

      <div id="cafe" className="p-7 lg:flex lg:flex-col bg-secondary lg:items-center">
        <InfoSection />
      </div>
      <div className=" w-full">
      <Feedback />
      </div>

      <div id="cafe" className="p-7 lg:flex lg:flex-col bg-secondary lg:items-center">
        <InfoLocation />
      </div>
      <footer>
        <Footer />
      </footer>

      <WhatsAppButton phoneNumber={whatsNumber} />
    </>
  );
};

export default Home;
