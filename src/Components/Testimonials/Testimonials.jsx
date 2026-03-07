import { useState, useRef, useEffect } from "react";
import { FaStar, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

const Testimonials = () => {
    const { t } = useLanguage();
    const items = t("testimonials.items");
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
        }, 7000);
        return () => clearInterval(timer);
    }, [items.length]);

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) setCurrentIndex((p) => (p === items.length - 1 ? 0 : p + 1));
            else setCurrentIndex((p) => (p === 0 ? items.length - 1 : p - 1));
        }
    };

    return (
        <section id="depoimentos" className="section-padding bg-dimwhite border-t border-b border-dark/5">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16" data-aos="fade-up">
                    <p className="section-subtitle">{t("testimonials.subtitle")}</p>
                    <h2 className="section-title mb-6">{t("testimonials.title")}</h2>

                    <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full border border-dark/5 shadow-sm">
                        <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => <FaStar key={i} size={14} />)}
                        </div>
                        <span className="text-dark font-semibold text-sm">4.9</span>
                        <span className="text-dark/40">|</span>
                        <span className="text-dark/60 text-xs font-medium">{t("testimonials.badge")}</span>
                    </div>
                </div>

                <div
                    className="relative max-w-4xl mx-auto"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                >
                    <button
                        onClick={() => setCurrentIndex((p) => (p === 0 ? items.length - 1 : p - 1))}
                        className="absolute -left-4 md:-left-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-dark/10 flex items-center justify-center text-dark/40 hover:text-secondary hover:border-secondary/30 transition-all duration-300 shadow-sm z-10 hidden md:flex"
                        aria-label={t("testimonials.prevLabel")}
                    >
                        <FaChevronLeft size={14} />
                    </button>

                    <button
                        onClick={() => setCurrentIndex((p) => (p === items.length - 1 ? 0 : p + 1))}
                        className="absolute -right-4 md:-right-14 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-dark/10 flex items-center justify-center text-dark/40 hover:text-secondary hover:border-secondary/30 transition-all duration-300 shadow-sm z-10 hidden md:flex"
                        aria-label={t("testimonials.nextLabel")}
                    >
                        <FaChevronRight size={14} />
                    </button>

                    <div className="bg-white p-10 md:p-14 rounded-sm border border-dark/5 shadow-sm text-center" data-aos="fade-up">
                        <FaQuoteLeft className="text-secondary/15 mx-auto mb-8" size={48} />

                        <p
                            key={currentIndex}
                            className="text-dark/70 text-base md:text-lg font-sans leading-relaxed mb-10 max-w-2xl mx-auto animate-fade-in italic"
                        >
                            "{items[currentIndex].text}"
                        </p>

                        <div className="flex text-secondary mb-3 justify-center">
                            {[...Array(5)].map((_, i) => (
                                <FaStar key={i} size={14} />
                            ))}
                        </div>

                        <h4 className="text-lg font-serif font-medium text-dark">
                            {items[currentIndex].name}
                        </h4>
                        <p className="text-dark/40 text-xs font-sans tracking-wider uppercase mt-1">
                            Google Reviews
                        </p>
                    </div>

                    <div className="flex justify-center gap-2 mt-8">
                        {items.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`transition-all duration-300 rounded-full ${currentIndex === index
                                    ? "w-8 h-2 bg-secondary"
                                    : "w-2 h-2 bg-dark/15 hover:bg-dark/30"
                                    }`}
                                aria-label={`${t("testimonials.subtitle")} ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
