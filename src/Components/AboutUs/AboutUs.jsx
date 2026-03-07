import { FaMapMarkerAlt, FaCoffee, FaBus, FaWifi } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

const icons = [FaMapMarkerAlt, FaCoffee, FaBus, FaWifi];

const AboutUs = () => {
    const { t } = useLanguage();
    const features = t("about.features");

    return (
        <section id="sobre" className="section-padding bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16 md:mb-20" data-aos="fade-up">
                    <p className="section-subtitle">{t("about.subtitle")}</p>
                    <h2 className="section-title mb-6">{t("about.title")}<br className="hidden md:block" /> {t("about.titleBreak")}</h2>
                    <div className="section-divider" />
                </div>

                <div className="max-w-3xl mx-auto text-center mb-20" data-aos="fade-up" data-aos-delay="100">
                    <p className="text-dark/70 text-lg md:text-xl font-sans font-light leading-relaxed">
                        {t("about.story")}
                        <span className="text-secondary font-medium"> {t("about.storyTioMica")}</span> {t("about.storyAnd")}
                        <span className="text-secondary font-medium"> {t("about.storyTiaNeia")}</span> {t("about.storyEnd")}
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {features.map((feature, index) => {
                        const Icon = icons[index];
                        return (
                            <div
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="group bg-white rounded-sm p-8 md:p-10 text-center border border-dark/5 card-hover"
                            >
                                <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                                    <Icon className="text-secondary" size={24} />
                                </div>
                                <h3 className="font-sans font-semibold text-dark text-base mb-2 tracking-wide">
                                    {feature.title}
                                </h3>
                                <p className="text-dark/60 text-sm font-sans leading-relaxed">
                                    {feature.desc}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AboutUs;
