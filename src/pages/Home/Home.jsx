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
      
      <div className="flex flex-col items-center mt-20 md:mt-5">
        <HomeNav />
        <RandomSwiper />
        <PrincipalText>Localizada a 1 km do parque Beto Carrero World, a Pousada Rosália é cuidada por uma família nativa que vive na cidade há mais de 50 anos. <br />
        O tio Mica e a Tia Néia são os proprietários da pousada, sempre fazendo o máximo para com que seus hóspedes se sintam em casa.</PrincipalText>
      </div>

      <div id="quartos" className="bg-primary flex flex-col items-center">
          <RoomsInfo className="w-full p-0 bg-beige-100" />
      </div>  

      <div id="cafe" className="p-4 md:p-7 flex flex-col bg-secondary items-center">
        <InfoSection />
      </div>
      <div className="w-full">
        <Feedback />
      </div>

      <div id="cafe" className="p-4 md:p-7 flex flex-col bg-secondary items-center">
        <InfoLocation />
      </div>
      <footer>
        <Footer 
          bgColorClass="bg-primary" 
          textColorClass="text-secondary"
          copyrightTextColorClass="text-secondary" 
        />
      </footer>

      <WhatsAppButton phoneNumber={whatsNumber} />
    </>
  );
};

export default Home;
