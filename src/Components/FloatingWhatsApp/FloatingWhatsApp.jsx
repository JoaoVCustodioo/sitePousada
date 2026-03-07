import { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

const FloatingWhatsApp = () => {
    const { t } = useLanguage();
    const [showBadge, setShowBadge] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowBadge(true), 3000);
        return () => clearTimeout(timer);
    }, []);

    const whatsappLink = `https://wa.me/554788059849?text=${encodeURIComponent(t("floating.message"))}`;

    return (
        <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
            aria-label={t("floating.ariaLabel")}
        >
            <span className={`bg-white text-dark text-sm font-sans font-medium px-4 py-2.5 rounded-sm shadow-lg border border-dark/5 transition-all duration-500 whitespace-nowrap hidden md:block ${showBadge
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4"
                }`}>
                {t("floating.badge")}
            </span>

            <div className="relative">
                <div className="absolute inset-0 rounded-full bg-accent animate-ping-slow opacity-20" />
                <div className="relative bg-accent text-white p-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    <FaWhatsapp className="w-7 h-7 md:w-8 md:h-8" />
                </div>
            </div>
        </a>
    );
};

export default FloatingWhatsApp;
