import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import AboutUs from "../../Components/AboutUs/AboutUs";
import RoomsPreview from "../../Components/RoomsPreview/RoomsPreview";
import Experiences from "../../Components/Experiences/Experiences";
import Gallery from "../../Components/Gallery/Gallery";
import Testimonials from "../../Components/Testimonials/Testimonials";
import CtaStrip from "../../Components/CtaStrip/CtaStrip";
import Location from "../../Components/Location/Location";
import Faq from "../../Components/Faq/Faq";
import SiteFooter from "../../Components/SiteFooter/SiteFooter";
import FloatingWhatsApp from "../../Components/FloatingWhatsApp/FloatingWhatsApp";

const Home = () => {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <AboutUs />

        <div id="quartos">
          <RoomsPreview />
        </div>

        <Experiences />
        <Gallery />
        <Testimonials />
        <CtaStrip />
        <Location />
        <Faq />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default Home;
