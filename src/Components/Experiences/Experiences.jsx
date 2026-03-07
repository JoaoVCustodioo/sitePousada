import { FaCoffee, FaBus, FaChild, FaUmbrellaBeach, FaCar, FaWifi } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";
import kombi from "../../assets/images/kombi.jpg";
import cafe from "../../assets/images/cafe.jpg";
import parquinho from "../../assets/images/parquinho.JPG";
import parquinho2 from "../../assets/images/parquinho2.jpg";

const cardImages = [cafe, kombi, parquinho, parquinho2];
const cardIcons = [FaCoffee, FaBus, FaChild, FaUmbrellaBeach];

const Experiences = () => {
    const { t } = useLanguage();
    const cards = t("experiences.cards");

    return (
        <section id="experiencias" className="section-padding bg-dark">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
                    <p className="text-tertiary font-sans font-medium tracking-widest uppercase text-xs md:text-sm mb-4">
                        {t("experiences.subtitle")}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-wide">
                        {t("experiences.title")}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {cards.map((card, index) => {
                        const Icon = cardIcons[index];
                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={(index + 1) * 80}
                                className="group bg-white/5 backdrop-blur-sm rounded-sm overflow-hidden border border-white/10 hover:border-white/20 card-hover"
                            >
                                <div className="relative h-56 md:h-64 overflow-hidden">
                                    <img
                                        src={cardImages[index]}
                                        alt={card.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                        loading="lazy"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                                    <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-secondary/90 flex items-center justify-center shadow-lg">
                                        <Icon className="text-white" size={18} />
                                    </div>
                                </div>

                                <div className="p-6 md:p-8">
                                    <span className="text-tertiary text-[10px] uppercase tracking-[0.2em] font-semibold">
                                        {card.subtitle}
                                    </span>
                                    <h3 className="text-lg md:text-xl font-serif font-normal text-white mt-1 mb-3">
                                        {card.title}
                                    </h3>
                                    <p className="text-white/60 text-sm font-sans leading-relaxed">
                                        {card.text}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="mt-16 md:mt-24 flex flex-col sm:flex-row items-center justify-center gap-10 text-white/70" data-aos="fade-up">
                    <div className="flex items-center gap-3">
                        <FaCar size={22} className="text-tertiary" />
                        <span className="font-sans font-light text-base md:text-lg">{t("experiences.parking")}</span>
                    </div>
                    <div className="hidden sm:block w-px h-8 bg-white/15" />
                    <div className="flex items-center gap-3">
                        <FaWifi size={22} className="text-tertiary" />
                        <span className="font-sans font-light text-base md:text-lg">{t("experiences.wifi")}</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experiences;
