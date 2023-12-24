import Nav from "../../Components/Nav/Nav";
import SwiperQuartos from "../../Components/SwiperQuartos/SwiperQuartos";
import PrincipalText from "../../Components/PrincipalTexts/PrincipalTexts";
import DividerText from "../../Components/DividerText/DividerText";
import Divider from "../../Components/Divider/Divider";
import Postite from "../../Components/Postite/Postite";
import ImageText from "../../Components/ImageText/ImageText";
import SwiperCafe from "../../Components/SwiperCafe/SwiperCafe";
import SwiperMadagaskombi from "../../Components/SwiperMadagaskombi/SwiperMadagaskombi";
import SwiperParquinho from "../../Components/SwiperParquinho/SwiperParquinho";
import Mapa from "../../Components/Mapa/Mapa";
import Footer from "../../Components/Footer/Footer";
import WhatsAppButton from "../../Components/WhatsAppButton/WhatsAppButton";
import RandomSwiper from "../../Components/RandomSwiper/RandomSwiper";

export const Home = () => {

  const whatsNumber = 554788059849

  return (
    <>
       
      <div className="p-7 lg:flex lg:flex-col lg:items-center">
        
        <RandomSwiper />
        <Divider />
        <PrincipalText>Uma pousada familiar em Penha</PrincipalText>
        <Postite>
        Localizada a 1Km do Beto Carrero World, a Pousada Rosália oferece
        acomodações em Penha. O WiFi é gratuito e o café da manhã de cortesia é
        servido diariamente, também fazemos o transfer gratuito para o Beto
        Carrero com a tão querida Madagaskombi. <br /> <br /> A pousada é
        cuidada por uma fámilia nativa que vive na cidade há mais de 50 anos. O
        tio Mica e a Tia Néia são os proprietários da pousada, sempre fazendo o
        máximo para com que seus hóspedes se sintam em casa.
        </Postite>
        
      </div>
      
      

      <DividerText>Nossos quartos</DividerText>

      <div id="quartos" className="p-7 lg:flex lg:flex-col lg:items-center ">
        <SwiperQuartos />
        <ImageText>
          Todos os nossos quartos possuem TV, frigobar, WI-FI gratuíto,
          Ar-condiocionado, um banheiro privativo e também o jogo de quarto
          completo. Além do deliciosissímo café da manhã servido na pousada!
        </ImageText>
      </div>

      <DividerText>Café da manhã</DividerText>

      <div id="cafe" className="p-7 lg:flex lg:flex-col lg:items-center">
        <SwiperCafe />
        <ImageText>
          Um café da manhã feito com muito amor e servido todos os dias na
          pousada.
          <br /> <br /> Horário: 8h às 10h.
        </ImageText>
      </div>

      <DividerText>A Madagaskombi</DividerText>
      <div id="madagaskombi" className="p-7 lg:flex lg:flex-col lg:items-center">
        <SwiperMadagaskombi />
        <ImageText>
          A Madagaskombi é uma das principais atrações da pousada, é uma kombi
          que foi estilizada e personalizada tendo como referencia o parque Beto
          Carrero. Uma ótima opção para ir ao parque e é por cortesia da
          pousada, levamos e buscamos o horário que acharem melhor, todos os
          dias.
        </ImageText>
      </div>

      <DividerText>O Parquinho</DividerText>

      <div className="p-7 lg:flex lg:flex-col lg:items-center">
        <SwiperParquinho />
      </div>

      <DividerText>Nossa Localização</DividerText>
      <div id="contato" className="p-7 lg:flex lg:flex-col lg:items-center">
        <Postite>
          A nossa pousada está muito bem localizada no bairro Armação, à 300
          metros da praia mais próxima e em uma das principais avenidas da
          cidade. Contando com restaurantes, farmácias e mercados em um raio de
          200 metros. <br />
          <br />
          Rua Inácio Francisco de Souza, 208. Armação - Penha
        </Postite>
        <Mapa />
      </div>
      <footer>
        <Footer />
      </footer>

      <WhatsAppButton phoneNumber={whatsNumber} />
    </>
  );
};

export default Home;
