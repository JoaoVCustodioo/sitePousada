import { lazy, Suspense, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Hero from "../../Components/Hero/Hero";
import SiteFooter from "../../Components/SiteFooter/SiteFooter";
import FloatingWhatsApp from "../../Components/FloatingWhatsApp/FloatingWhatsApp";

const AboutUs = lazy(() => import("../../Components/AboutUs/AboutUs"));
const RoomsPreview = lazy(() => import("../../Components/RoomsPreview/RoomsPreview"));
const Experiences = lazy(() => import("../../Components/Experiences/Experiences"));
const Gallery = lazy(() => import("../../Components/Gallery/Gallery"));
const Testimonials = lazy(() => import("../../Components/Testimonials/Testimonials"));
const CtaStrip = lazy(() => import("../../Components/CtaStrip/CtaStrip"));
const Location = lazy(() => import("../../Components/Location/Location"));
const Faq = lazy(() => import("../../Components/Faq/Faq"));

const Home = () => {
  const [loadRest, setLoadRest] = useState(false);

  useEffect(() => {
    const showRest = () => setLoadRest(true);
    const idleId = window.requestIdleCallback
      ? window.requestIdleCallback(showRest, { timeout: 1200 })
      : window.setTimeout(showRest, 900);

    return () => {
      if (window.cancelIdleCallback) window.cancelIdleCallback(idleId);
      else window.clearTimeout(idleId);
    };
  }, []);

  return (
    <>
      <Header />

      <main>
        <Hero />

        {loadRest && (
          <Suspense fallback={null}>
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
          </Suspense>
        )}
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
};

export default Home;
