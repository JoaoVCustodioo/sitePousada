import { Link } from "react-router-dom";
import RoomSwiper from "../RoomSwiper/RoomSwiper";
import { useLanguage } from "../../i18n/LanguageContext";
import acomodacoesMain from "../../assets/images/acomodacoesMain.jpg";
import { FaUserFriends, FaBed, FaWifi, FaSnowflake, FaTv, FaWhatsapp, FaChevronRight } from "react-icons/fa";

// Duplo
import duplo from "../../assets/images/Duplo/duploFoto.jpeg";
import duplo1 from "../../assets/images/Duplo/duploFoto1.jpeg";
import duplo2 from "../../assets/images/Duplo/duploFoto2.jpeg";

// Triplo
import triplo from "../../assets/images/Triplo/triplo.jpeg";
import triplo1 from "../../assets/images/Triplo/triplo1.jpeg";
import triplo2 from "../../assets/images/Triplo/triplo2.jpeg";

// Quadruplo
import quadruplo from "../../assets/images/Quadruplo/quadruplo.jpeg";
import quadruplo1 from "../../assets/images/Quadruplo/quadruplo1.jpeg";
import quadruplo2 from "../../assets/images/Quadruplo/quadruplo2.jpeg";
import quadruplo4 from "../../assets/images/Quadruplo/quadruplo4.jpeg";
import quadruplo5 from "../../assets/images/Quadruplo/quadruplo5.jpeg";

// Triplo Varanda
import triploVaranda from "../../assets/images/TriploVaranda/triploVaranda.jpeg";
import triploVaranda1 from "../../assets/images/TriploVaranda/triploVaranda1.jpeg";
import triploVaranda2 from "../../assets/images/TriploVaranda/triploVaranda2.jpeg";
import triploVaranda3 from "../../assets/images/TriploVaranda/triplovaranda3.jpeg";

// Quadruplo Varanda
import quadruploVaranda from "../../assets/images/QuadruploVaranda/quadruploVaranda.jpeg";
import quadruploVaranda1 from "../../assets/images/QuadruploVaranda/quadruploVaranda1.jpeg";
import quadruploVaranda2 from "../../assets/images/QuadruploVaranda/quadruploVaranda2.jpeg";

// Quintuplo Varanda
import quintuplo from "../../assets/images/QuintuploVaranda/quintuplo.jpeg";
import quintuplo1 from "../../assets/images/QuintuploVaranda/quintuplo1.jpeg";
import quintuplo2 from "../../assets/images/QuintuploVaranda/quintuplo2.jpeg";
import quintuplo3 from "../../assets/images/QuintuploVaranda/quintuplo3.jpeg";

const roomPhotos = [
  [duplo, duplo1, duplo2],
  [triplo, triplo1, triplo2],
  [triploVaranda, triploVaranda1, triploVaranda2, triploVaranda3],
  [quadruplo, quadruplo1, quadruplo2, quadruplo4, quadruplo5],
  [quadruploVaranda, quadruploVaranda1, quadruploVaranda2],
  [quintuplo, quintuplo1, quintuplo2, quintuplo3],
];

const Rooms = () => {
  const { t } = useLanguage();
  const items = t("rooms.items");

  return (
    <div className="w-full bg-primary overflow-x-hidden">
      {/* Hero */}
      <section className="relative h-[40vh] md:h-[55vh]" style={{ marginTop: "calc(36px + 56px)" }}>
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${acomodacoesMain})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-dark/60" />
        </div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <p className="text-tertiary tracking-widest uppercase font-medium text-xs md:text-sm mb-3" data-aos="fade-down">
            {t("rooms.heroSubtitle")}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-light text-white tracking-wide mb-3" data-aos="fade-up" data-aos-delay="100">
            {t("rooms.heroTitle")}
          </h1>
          <p className="text-white/60 text-sm md:text-base font-sans" data-aos="fade-up" data-aos-delay="200">
            {t("rooms.heroDesc")}
          </p>
        </div>
      </section>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 border-b border-dark/5">
        <nav className="flex items-center gap-2 text-xs font-sans text-dark/40">
          <Link to="/" className="hover:text-secondary transition-colors">{t("nav.home")}</Link>
          <FaChevronRight size={8} />
          <span className="text-dark/70 font-medium">{t("rooms.heroTitle")}</span>
        </nav>
      </div>

      {/* Intro */}
      <section className="py-16 md:py-20 max-w-3xl mx-auto px-6 text-center" data-aos="fade-up">
        <p className="text-dark/70 font-sans text-lg md:text-xl font-light leading-relaxed">
          {t("rooms.introText")}
        </p>
        <div className="section-divider" />
      </section>

      {/* Rooms List */}
      <div className="w-full pb-20">
        {items.map((quarto, index) => {
          const isEven = index % 2 === 0;
          const bgClass = isEven ? "bg-white" : "bg-dimwhite";
          const hasVaranda = quarto.subtype === t("rooms.withBalcony");

          return (
            <div key={`${quarto.type}-${quarto.subtype}`} className={`${bgClass} w-full py-16 md:py-24 px-4 md:px-12`}>
              <div className={`max-w-7xl mx-auto flex flex-col items-center gap-10 lg:gap-16 ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"}`} data-aos="fade-up">

                {/* Swiper */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className={`absolute inset-0 bg-secondary/8 transform -z-10 rounded-sm transition-transform duration-500 ${isEven ? "translate-x-5 translate-y-5 group-hover:translate-x-2 group-hover:translate-y-2" : "-translate-x-5 translate-y-5 group-hover:-translate-x-2 group-hover:translate-y-2"}`} />
                  <div className="rounded-sm overflow-hidden shadow-lg border border-dark/5 h-[350px] md:h-[450px]">
                    <RoomSwiper slides={roomPhotos[index]} />
                  </div>
                </div>

                {/* Info */}
                <div className="w-full lg:w-1/2 flex flex-col">
                  <span className={`inline-flex self-start px-3 py-1.5 text-[10px] uppercase tracking-[0.15em] font-semibold rounded-full border mb-3 ${hasVaranda
                    ? "bg-accent/10 text-accent border-accent/20"
                    : "bg-dark/5 text-dark/50 border-dark/10"
                    }`}>
                    {quarto.subtype}
                  </span>

                  <h2 className="text-3xl md:text-4xl font-serif font-light text-dark mb-5">{quarto.type}</h2>
                  <p className="text-base md:text-lg text-dark/65 font-sans leading-relaxed mb-8">{quarto.description}</p>

                  {/* Stats */}
                  <div className="flex flex-col sm:flex-row gap-4 mb-8">
                    <div className="flex items-center gap-4 bg-primary px-5 py-4 rounded-sm border border-dark/5 flex-1">
                      <FaBed className="text-secondary text-xl shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-dark/40 font-semibold">{t("rooms.layout")}</span>
                        <span className="text-sm font-medium text-dark">{quarto.bed}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-primary px-5 py-4 rounded-sm border border-dark/5 flex-1">
                      <FaUserFriends className="text-secondary text-xl shrink-0" />
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase tracking-widest text-dark/40 font-semibold">{t("rooms.capacity")}</span>
                        <span className="text-sm font-medium text-dark">{quarto.people}</span>
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex gap-5 text-secondary/70 mb-8 border-t border-dark/5 pt-6">
                    {[
                      { icon: FaSnowflake, label: t("rooms.climate") },
                      { icon: FaWifi, label: "Wi-Fi" },
                      { icon: FaTv, label: "TV" },
                    ].map((amenity, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                        <amenity.icon size={16} />
                        <span className="hidden sm:inline">{amenity.label}</span>
                      </div>
                    ))}
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider">
                      <span className="border border-current rounded-sm w-4 h-4 flex items-center justify-center text-[8px] font-bold">F</span>
                      <span className="hidden sm:inline">{t("rooms.frigobar")}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  <a
                    href={`https://wa.me/554788059849?text=${encodeURIComponent(quarto.whatsMsg)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-whatsapp w-full sm:w-auto self-start justify-center"
                  >
                    <FaWhatsapp size={18} />
                    {t("rooms.checkAvailability")}
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rooms;