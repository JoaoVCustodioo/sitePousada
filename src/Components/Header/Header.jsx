import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaWhatsapp, FaPhone, FaInstagram, FaChevronDown } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useLanguage } from "../../i18n/LanguageContext";
import LogoPousada from "../../assets/images/logo-pousada.png";

const flags = {
    pt: "🇧🇷",
    es: "🇪🇸",
    en: "🇺🇸",
};

const langLabels = {
    pt: "PT",
    es: "ES",
    en: "EN",
};

const Header = () => {
    const { t, locale, setLocale } = useLanguage();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 60);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close lang dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (langRef.current && !langRef.current.contains(e.target)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Lock body scroll when menu is open
    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    const scrollToSection = (sectionId) => {
        setIsMenuOpen(false);
        if (location.pathname !== "/") {
            window.location.href = `/#${sectionId}`;
            return;
        }
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    };

    const navLinks = [
        { label: t("nav.home"), type: "link", to: "/" },
        { label: t("nav.rooms"), type: "link", to: "/Acomodacoes" },
        { label: t("nav.experiences"), type: "scroll", target: "experiencias" },
        { label: t("nav.gallery"), type: "scroll", target: "galeria" },
        { label: t("nav.location"), type: "scroll", target: "localizacao" },
        { label: t("nav.faq"), type: "scroll", target: "faq" },
    ];

    return (
        <>
            {/* ─── Top Bar ─── */}
            <div className="bg-dark/95 backdrop-blur-sm text-white/90 py-1.5 px-4 w-full fixed top-0 left-0 z-[60] border-b border-white/5">
                <div className="flex justify-center sm:justify-between items-center max-w-7xl mx-auto text-[10px] sm:text-xs font-sans font-medium h-6">
                    <div className="flex items-center gap-3 sm:gap-5">
                        <a href="tel:+554733451821" className="flex items-center gap-1.5 hover:text-white transition-colors">
                            <FaPhone size={10} />
                            <span className="hidden sm:inline">(47) 3345-1821</span>
                        </a>
                        <span className="text-white/20">|</span>
                        <a href="https://wa.me/554788059849?text=Olá! Gostaria de informações sobre a Pousada Rosália." target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-accent transition-colors">
                            <FaWhatsapp size={12} className="text-accent" />
                            <span className="hidden sm:inline">(47) 98805-9849</span>
                        </a>
                        <span className="text-white/20 hidden sm:inline">|</span>
                        <a href="mailto:pousadarosalia@hotmail.com" className="hidden sm:flex items-center gap-1.5 hover:text-white transition-colors">
                            <MdEmail size={13} />
                            <span>pousadarosalia@hotmail.com</span>
                        </a>
                    </div>

                    <a href="https://www.instagram.com/pousadarosaliia/?hl=pt" target="_blank" rel="noopener noreferrer"
                        className="hidden sm:flex items-center gap-2 hover:text-white transition-colors" title="Instagram">
                        <FaInstagram size={14} />
                        <span>@pousadarosaliia</span>
                    </a>
                </div>
            </div>

            {/* ─── Main Navbar ─── */}
            <header className={`fixed top-[36px] left-0 w-full z-50 transition-all duration-500 ${isScrolled
                ? "bg-primary/95 backdrop-blur-md shadow-lg py-2"
                : "bg-primary py-4 md:py-5"
                }`}>
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" onClick={() => setIsMenuOpen(false)} className="relative z-50 flex-shrink-0">
                        <img
                            src={LogoPousada}
                            alt="Logo Pousada Rosália"
                            className={`object-contain transition-all duration-500 ${isScrolled ? "h-12 md:h-14" : "h-16 md:h-20"}`}
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
                        {navLinks.map((link) => (
                            <div key={link.label} className="relative group">
                                {link.type === "link" ? (
                                    <Link
                                        to={link.to}
                                        className="text-dark/80 hover:text-secondary font-sans text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 py-2"
                                    >
                                        {link.label}
                                    </Link>
                                ) : (
                                    <button
                                        onClick={() => scrollToSection(link.target)}
                                        className="text-dark/80 hover:text-secondary font-sans text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 py-2 bg-transparent border-none cursor-pointer"
                                    >
                                        {link.label}
                                    </button>
                                )}
                                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-secondary transition-all duration-300 group-hover:w-full" />
                            </div>
                        ))}

                        {/* Language Switcher Desktop */}
                        <div className="relative" ref={langRef}>
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="flex items-center gap-1.5 text-dark/70 hover:text-dark font-sans text-[13px] font-medium tracking-wider uppercase transition-colors duration-300 py-2 bg-transparent border border-dark/10 rounded-full px-3 hover:border-dark/20"
                            >
                                <span className="text-base leading-none">{flags[locale]}</span>
                                <span>{langLabels[locale]}</span>
                                <FaChevronDown size={8} className={`transition-transform duration-200 ${isLangOpen ? "rotate-180" : ""}`} />
                            </button>

                            {/* Dropdown */}
                            <div className={`absolute top-full right-0 mt-2 bg-white rounded-sm shadow-xl border border-dark/10 overflow-hidden transition-all duration-200 min-w-[140px] ${isLangOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}>
                                {Object.keys(flags).map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => { setLocale(lang); setIsLangOpen(false); }}
                                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-sans transition-colors duration-200 ${locale === lang ? "bg-secondary/10 text-secondary font-medium" : "text-dark/70 hover:bg-dimwhite hover:text-dark"}`}
                                    >
                                        <span className="text-base">{flags[lang]}</span>
                                        <span>{lang === "pt" ? "Português" : lang === "es" ? "Español" : "English"}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Desktop WhatsApp CTA */}
                        <a
                            href={`https://wa.me/554788059849?text=${encodeURIComponent(t("hero.whatsappMessage"))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 bg-accent hover:bg-green-600 text-white text-xs font-semibold tracking-wider uppercase px-5 py-2.5 rounded-sm transition-all duration-300 hover:scale-[1.02] shadow-sm"
                        >
                            <FaWhatsapp size={16} />
                            {t("nav.contact")}
                        </a>
                    </nav>

                    {/* Mobile Hamburger */}
                    <button
                        className="lg:hidden relative z-50 text-dark p-2 focus:outline-none"
                        onClick={() => setIsMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <FaBars size={24} />
                    </button>
                </div>
            </header>

            {/* ─── Mobile Menu Overlay ─── */}
            <div className={`fixed inset-0 z-[100] transition-all duration-500 lg:hidden ${isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
                }`}>
                {/* Dark backdrop */}
                <div
                    className={`absolute inset-0 bg-dark/60 backdrop-blur-sm transition-opacity duration-500 ${isMenuOpen ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={() => setIsMenuOpen(false)}
                />

                {/* Menu panel */}
                <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-primary shadow-2xl transition-transform duration-500 ease-out flex flex-col ${isMenuOpen ? "translate-x-0" : "translate-x-full"
                    }`}>
                    {/* Menu Header */}
                    <div className="flex items-center justify-between px-6 pt-8 pb-4 border-b border-dark/5">
                        <img src={LogoPousada} alt="Logo" className="h-10 object-contain" />
                        <button
                            className="text-dark hover:text-secondary p-2 focus:outline-none transition-colors bg-dark/5 rounded-full"
                            onClick={() => setIsMenuOpen(false)}
                            aria-label="Close menu"
                        >
                            <FaTimes size={18} />
                        </button>
                    </div>

                    {/* Language Switcher Mobile */}
                    <div className="flex items-center justify-center gap-3 px-6 py-5 border-b border-dark/5 bg-dark/5/30">
                        {Object.keys(flags).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => setLocale(lang)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all duration-200 border ${locale === lang
                                    ? "bg-secondary text-white border-secondary shadow-md transform scale-105"
                                    : "bg-white text-dark/70 border-dark/10 hover:bg-dark/5 hover:text-dark hover:border-dark/20"
                                    }`}
                            >
                                <span className="text-lg leading-none">{flags[lang]}</span>
                                <span className="text-[11px] uppercase tracking-[0.1em]">{langLabels[lang]}</span>
                            </button>
                        ))}
                    </div>

                    {/* Menu Links */}
                    <nav className="flex-1 overflow-y-auto py-4 px-6">
                        <ul className="flex flex-col">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    {link.type === "link" ? (
                                        <Link
                                            to={link.to}
                                            onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
                                            className="block py-4 text-dark/80 hover:text-secondary font-sans text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 border-b border-dark/5"
                                        >
                                            {link.label}
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => scrollToSection(link.target)}
                                            className="block w-full text-left py-4 text-dark/80 hover:text-secondary font-sans text-[13px] font-medium tracking-[0.15em] uppercase transition-colors duration-300 border-b border-dark/5 bg-transparent"
                                        >
                                            {link.label}
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Mobile CTA */}
                    <div className="p-6 mt-auto bg-dark/5/30 border-t border-dark/5">
                        <a
                            href={`https://wa.me/554788059849?text=${encodeURIComponent(t("hero.whatsappMessage"))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 w-full bg-accent hover:bg-green-600 text-white text-[13px] font-semibold tracking-wider uppercase px-5 py-3.5 rounded-md transition-all duration-300 shadow-md transform hover:-translate-y-1"
                        >
                            <FaWhatsapp size={20} />
                            {t("nav.contact")}
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Header;
