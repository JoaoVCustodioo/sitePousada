import Nav from "../../Components/Nav/Nav";
import Footer from "../../Components/Footer/Footer";
import WhatsAppButton from "../../Components/WhatsAppButton/WhatsAppButton";
import HomeNav from "../../Components/HomeNav/HomeNav";
import Rooms from "../../Components/Rooms/Rooms";


export const Home = () => {

  const whatsNumber = 554788059849

  return (
    <>
       <Nav />
      
      <div className="flex flex-col items-center mt-20 md:mt-5">
        <HomeNav />
      </div>

      <div className="flex flex-col items-center mt-5">
        <Rooms />
      </div>
     
      <footer>
        <Footer 
          bgColorClass="bg-secondary"
          textColorClass="text-primary"
          copyrightTextColorClass="text-primary"
        />
      </footer>

      <WhatsAppButton phoneNumber={whatsNumber} />
    </>
  );
};

export default Home;
