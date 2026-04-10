import { Link } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";
import duplo from "../../assets/images/Duplo/duploFoto.jpeg";
import quadruplo from "../../assets/images/Quadruplo/quadruplo.jpeg";
import quintuplo from "../../assets/images/QuintuploVaranda/quintuplo.jpeg";
import duploWebp from '../../assets/images/Duplo/duploFoto-desktop.webp'
import quadruploWebp from '../../assets/images/Quadruplo/quadruplo-desktop.webp'
import quintuploWebp from '../../assets/images/QuintuploVaranda/quintuplo-desktop.webp'

const roomImages = [
    { original: duplo, webp: duploWebp },
    { original: quadruplo, webp: quadruploWebp },
    { original: quintuplo, webp: quintuploWebp },
];
const badgeColors = [
    "bg-white/90 text-dark/80 backdrop-blur-sm shadow-sm border-dark/10",
    "bg-white/90 text-dark/80 backdrop-blur-sm shadow-sm border-dark/10",
    "bg-white/90 text-accent backdrop-blur-sm shadow-sm font-bold border-accent/30",
];

const RoomsPreview = () => {
    const { t } = useLanguage();
    const rooms = t("roomsPreview.rooms");

    return (
        <section id="quartos" className="section-padding bg-dimwhite">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16" data-aos="fade-up">
                    <p className="section-subtitle">{t("roomsPreview.subtitle")}</p>
                    <h2 className="section-title mb-6">{t("roomsPreview.title")}</h2>
                    <p className="text-dark/60 text-base md:text-lg font-sans max-w-2xl mx-auto leading-relaxed">
                        {t("roomsPreview.description")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-14">
                    {rooms.map((room, index) => (
                        <div
                            key={index}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            className="group bg-white rounded-sm overflow-hidden border border-dark/5 card-hover"
                        >
                            <div className="relative h-64 md:h-72 overflow-hidden">
                                <picture>
                                    <source srcSet={roomImages[index].webp} type="image/webp" />
                                    <img
                                        src={roomImages[index].original}
                                        alt={room.name}
                                        width={800}
                                        height={576}
                                        loading="lazy"
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </picture>
                                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <span className={`absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full border ${badgeColors[index]}`}>
                                    {room.badge}
                                </span>
                            </div>

                            <div className="p-6 md:p-8">
                                <h3 className="text-xl md:text-2xl font-serif font-normal text-dark mb-2">
                                    {room.name}
                                </h3>
                                <div className="flex items-center gap-2 text-dark/50 text-sm mb-6">
                                    <FaUserFriends size={14} />
                                    <span>{room.capacity}</span>
                                </div>
                                <Link
                                    to="/Acomodacoes"
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="text-secondary hover:text-dark text-xs font-semibold tracking-[0.15em] uppercase transition-colors duration-300 flex items-center gap-2"
                                >
                                    {t("roomsPreview.viewDetails")}
                                    <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4" data-aos="fade-up">
                    <Link
                        to="/Acomodacoes"
                        onClick={() => window.scrollTo(0, 0)}
                        className="btn-outline"
                    >
                        {t("roomsPreview.viewAll")}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default RoomsPreview;
