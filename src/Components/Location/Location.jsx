import { FaMapMarkerAlt, FaRoute } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

const Location = () => {
    const { t } = useLanguage();
    const landmarks = t("location.landmarks");
    const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapEmbedUrl = mapsApiKey
        ? `https://www.google.com/maps/embed/v1/place?q=place_id:ChIJmYV7L7HR2JQRBFMaw9-GScg&key=${mapsApiKey}`
        : "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.498427952136!2d-48.611111!3d-26.786944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94d8d1e370baeb13%3A0x6eafdd201b2a970e!2sPousada%20Ros%C3%A1lia!5e0!3m2!1spt-BR!2sbr!4v1654123456789!5m2!1spt-BR!2sbr";

    return (
        <section id="localizacao" className="section-padding bg-dark">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16" data-aos="fade-up">
                    <p className="text-tertiary font-sans font-medium tracking-widest uppercase text-xs md:text-sm mb-4">
                        {t("location.subtitle")}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white tracking-wide">
                        {t("location.title")}
                    </h2>
                </div>

                {/* Map + Info side by side on desktop */}
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">

                    {/* Map */}
                    <div className="w-full lg:w-3/5 rounded-sm overflow-hidden min-h-[380px]" data-aos="fade-right" data-aos-delay="100">
                        <iframe
                            width="100%"
                            height="100%"
                            style={{ border: 0, minHeight: '380px' }}
                            loading="lazy"
                            allowFullScreen
                            referrerPolicy="no-referrer-when-downgrade"
                            src={mapEmbedUrl}
                            title="Localização Pousada Rosália"
                        />
                    </div>

                    {/* Info */}
                    <div className="w-full lg:w-2/5 text-white flex flex-col justify-center" data-aos="fade-left" data-aos-delay="200">
                        <p className="text-white/70 text-base font-sans leading-relaxed mb-8">
                            {t("location.description")}
                        </p>

                        {/* Address Card */}
                        <div className="flex items-start gap-4 mb-6 bg-white/5 p-5 rounded-sm border border-white/10">
                            <FaMapMarkerAlt className="text-tertiary mt-1 shrink-0" size={20} />
                            <div>
                                <p className="text-white font-medium font-sans mb-1">{t("location.address")}</p>
                                <p className="text-white/60 text-sm font-sans">{t("location.street")}</p>
                                <p className="text-white/60 text-sm font-sans">{t("location.neighborhood")}</p>
                            </div>
                        </div>

                        {/* Landmarks */}
                        <div className="grid grid-cols-2 gap-3 mb-8">
                            {landmarks.map((lm, i) => (
                                <div key={i} className="flex items-center gap-3 bg-white/5 px-4 py-3 rounded-sm border border-white/5">
                                    <FaRoute className="text-tertiary shrink-0" size={14} />
                                    <div>
                                        <p className="text-white/90 text-sm font-sans font-medium">{lm.name}</p>
                                        <p className="text-tertiary text-xs font-semibold">{lm.distance}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <a
                            href="https://www.google.com/maps/place/?q=place_id:ChIJmYV7L7HR2JQRBFMaw9-GScg"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 bg-white text-dark hover:bg-secondary hover:text-white text-sm tracking-widest uppercase font-medium px-8 py-4 rounded-sm transition-all duration-300 group"
                        >
                            <FaMapMarkerAlt size={14} className="text-secondary group-hover:text-white transition-colors" />
                            {t("location.openMaps")}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Location;
