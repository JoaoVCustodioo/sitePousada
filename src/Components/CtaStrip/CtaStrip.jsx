import { FaPhoneAlt } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";
import kombi from "../../assets/images/kombi.jpg";

const CtaStrip = () => {
    const { t } = useLanguage();

    return (
        <section className="relative py-24 md:py-32 overflow-hidden">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `url(${kombi})`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    backgroundAttachment: "fixed",
                }}
            >
                <div className="absolute inset-0 bg-dark/80 backdrop-blur-sm" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto text-center px-6">
                <h2
                    className="text-3xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-5 tracking-wide"
                    data-aos="fade-up"
                >
                    {t("cta.title")}
                </h2>
                <p
                    className="text-white/70 text-base md:text-lg font-sans mb-10 leading-relaxed"
                    data-aos="fade-up"
                    data-aos-delay="100"
                >
                    {t("cta.subtitle")}
                </p>

                <div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    <a
                        href="tel:+554733451821"
                        className="btn-outline border-white/40 text-white hover:bg-white/10 hover:text-white"
                    >
                        <FaPhoneAlt size={16} />
                        {t("cta.phone")}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CtaStrip;
