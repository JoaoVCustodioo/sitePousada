import { FaWhatsapp, FaInstagram, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useLanguage } from "../../i18n/LanguageContext";
import LogoPousada from "../../assets/images/logo-pousada.png";

const SiteFooter = () => {
    const { t } = useLanguage();

    const footerLinks = [
        { label: t("nav.home"), to: "/" },
        { label: t("nav.rooms"), to: "/Acomodacoes" },
    ];

    const footerScrollLinks = [
        { label: t("nav.experiences"), target: "experiencias" },
        { label: t("nav.gallery"), target: "galeria" },
        { label: t("nav.location"), target: "localizacao" },
        { label: t("nav.faq"), target: "faq" },
    ];

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: "smooth" });
        else window.location.href = `/#${sectionId}`;
    };

    return (
        <footer id="contato" className="bg-overlay-dark w-full">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                    {/* Column 1 — Brand */}
                    <div className="lg:col-span-1">
                        <img src={LogoPousada} alt="Logo Pousada Rosália" className="h-14 md:h-16 mb-6 object-contain brightness-0 invert opacity-90" />
                        <p className="text-white/60 font-sans text-sm leading-relaxed max-w-xs mb-6">
                            {t("footer.brand")}
                        </p>
                        <a
                            href={`https://wa.me/554788059849?text=${encodeURIComponent(t("floating.message"))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-accent hover:bg-green-600 text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-sm transition-all duration-300"
                        >
                            <FaWhatsapp size={16} />
                            {t("footer.contactBtn")}
                        </a>
                    </div>

                    {/* Column 2 — Navigation */}
                    <div>
                        <h3 className="text-secondary tracking-widest uppercase font-semibold text-xs mb-6">{t("footer.navigation")}</h3>
                        <ul className="space-y-3">
                            {footerLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.to} onClick={() => window.scrollTo(0, 0)} className="text-white/60 hover:text-white text-sm font-sans transition-colors duration-300">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                            {footerScrollLinks.map((link) => (
                                <li key={link.label}>
                                    <button onClick={() => scrollToSection(link.target)} className="text-white/60 hover:text-white text-sm font-sans transition-colors duration-300 bg-transparent border-none cursor-pointer">
                                        {link.label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 — Contact */}
                    <div>
                        <h3 className="text-secondary tracking-widest uppercase font-semibold text-xs mb-6">{t("footer.contact")}</h3>
                        <ul className="space-y-4">
                            <li>
                                <a href="https://wa.me/554788059849" className="flex items-center gap-3 text-white/60 hover:text-accent text-sm font-sans transition-colors duration-300">
                                    <FaWhatsapp size={16} className="text-accent shrink-0" />
                                    (47) 98805-9849
                                </a>
                            </li>
                            <li>
                                <a href="tel:+554733451821" className="flex items-center gap-3 text-white/60 hover:text-white text-sm font-sans transition-colors duration-300">
                                    <FaPhoneAlt size={14} className="text-white/40 shrink-0" />
                                    (47) 3345-1821
                                </a>
                            </li>
                            <li>
                                <a href="mailto:pousadarosalia@hotmail.com" className="flex items-center gap-3 text-white/60 hover:text-white text-sm font-sans transition-colors duration-300">
                                    <FaEnvelope size={14} className="text-white/40 shrink-0" />
                                    pousadarosalia@hotmail.com
                                </a>
                            </li>
                        </ul>

                        <div className="mt-8">
                            <h4 className="text-white/30 text-[10px] uppercase tracking-widest mb-3">{t("footer.hours")}</h4>
                            <p className="text-white/50 text-xs font-sans">{t("footer.checkin")}</p>
                            <p className="text-white/50 text-xs font-sans">{t("footer.checkout")}</p>
                        </div>
                    </div>

                    {/* Column 4 — Address & Social */}
                    <div>
                        <h3 className="text-secondary tracking-widest uppercase font-semibold text-xs mb-6">{t("footer.address")}</h3>
                        <div className="flex items-start gap-3 mb-6">
                            <FaMapMarkerAlt className="text-white/40 mt-0.5 shrink-0" size={14} />
                            <p className="text-white/60 text-sm font-sans leading-relaxed">
                                {t("location.street")}<br />
                                Bairro Armação<br />
                                Penha/SC — Brasil
                            </p>
                        </div>

                        <h3 className="text-secondary tracking-widest uppercase font-semibold text-xs mb-4">{t("footer.social")}</h3>
                        <a
                            href="https://www.instagram.com/pousadarosaliia/?hl=pt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-secondary hover:border-secondary text-white/60 hover:text-white transition-all duration-300"
                            aria-label="Instagram da Pousada Rosália"
                        >
                            <FaInstagram size={18} />
                        </a>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center text-center gap-2">
                    <p className="text-white/30 font-sans text-xs tracking-wide">
                        &copy; {new Date().getFullYear()} {t("footer.copyright")}
                    </p>
                    <p className="text-white/30 font-sans text-xs tracking-wide">
                        {t("footer.createdWith")} <span className="text-secondary">{t("footer.love")}</span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
