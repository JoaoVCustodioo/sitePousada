import { useState, useEffect, useRef, useCallback } from "react";
import { FaWhatsapp, FaChevronDown } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";
import Kombi from "../../assets/images/kombifachada.jpg";
import Parquinho from "../../assets/images/parquinho.JPG";
import Cafe from "../../assets/images/cafe.jpg";

const slideImages = [Kombi, Parquinho, Cafe];

const Hero = () => {
    const { t } = useLanguage();
    const slides = t("hero.slides");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);
    const timerRef = useRef(null);

    const goToSlide = useCallback((index) => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex(index);
        setTimeout(() => setIsTransitioning(false), 1000);
    }, [isTransitioning]);

    const nextSlide = useCallback(() => {
        goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
    }, [currentIndex, goToSlide, slides.length]);

    useEffect(() => {
        timerRef.current = setInterval(nextSlide, 6000);
        return () => clearInterval(timerRef.current);
    }, [nextSlide]);

    const handleTouchStart = (e) => { touchStartX.current = e.touches[0].clientX; };
    const handleTouchMove = (e) => { touchEndX.current = e.touches[0].clientX; };
    const handleTouchEnd = () => {
        const diff = touchStartX.current - touchEndX.current;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToSlide(currentIndex === slides.length - 1 ? 0 : currentIndex + 1);
            else goToSlide(currentIndex === 0 ? slides.length - 1 : currentIndex - 1);
        }
    };

    const scrollToQuartos = () => {
        const section = document.getElementById("quartos");
        if (section) section.scrollIntoView({ behavior: "smooth" });
    };

    const imagePositions = [
        "object-center md:object-[center_60%]", // Kombi Fachada
        "object-[center_top] md:object-center", // Parquinho
        "object-center" // Cafe
    ];

    return (
        <section
            className="relative w-full h-screen overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${currentIndex === index ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                    <img
                        src={slideImages[index]}
                        alt={slide.title}
                        className={`w-full h-full object-cover ${imagePositions[index]} transition-transform duration-[12000ms] ease-out ${currentIndex === index ? "scale-105" : "scale-100"}`}
                    />
                </div>
            ))}

            <div className="absolute inset-0 z-20 bg-gradient-to-t from-dark/70 via-dark/30 to-dark/10" />

            <div className="absolute inset-0 z-30 flex flex-col items-center text-center px-6 pt-28">
                <div className="flex-1 flex flex-col items-center justify-center">
                    <div className={`flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-5 py-2 rounded-full mb-4 transition-all duration-1000 ${currentIndex === 0 ? "translate-y-0 opacity-100" : "translate-y-0 opacity-100"}`}>
                        <span className="text-yellow-400 text-sm">★ 4.9</span>
                        <span className="text-white/40">|</span>
                        <span className="text-xs font-medium tracking-wide">{t("hero.badge")}</span>
                    </div>

                    <h1
                        key={`title-${currentIndex}`}
                        className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-light tracking-wide text-white mb-3 max-w-5xl animate-fade-in"
                    >
                        {slides[currentIndex].title}
                    </h1>

                    <p
                        key={`sub-${currentIndex}`}
                        className="text-base md:text-lg lg:text-xl font-sans text-white font-medium mb-6 max-w-2xl leading-relaxed animate-slide-up drop-shadow-lg"
                        style={{ textShadow: "0 2px 8px rgba(0,0,0,0.7)" }}
                    >
                        {slides[currentIndex].subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <a
                            href={`https://wa.me/554788059849?text=${encodeURIComponent(t("hero.whatsappMessage"))}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp text-base"
                        >
                            <FaWhatsapp size={22} />
                            {t("hero.cta")}
                        </a>
                        <button
                            onClick={scrollToQuartos}
                            className="flex items-center gap-2 border border-white/40 text-white hover:bg-white/10 backdrop-blur-sm font-sans font-medium text-sm tracking-wider uppercase px-8 py-3.5 rounded-sm transition-all duration-300"
                        >
                            {t("hero.ctaRooms")}
                        </button>
                    </div>
                </div>

                <div className="pb-6 flex flex-col items-center gap-3">
                    <div className="flex justify-center gap-3">
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToSlide(index)}
                                className={`transition-all duration-500 rounded-full ${currentIndex === index
                                    ? "w-10 h-2 bg-secondary"
                                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                                    }`}
                                aria-label={`${t("hero.goToSlide")} ${index + 1}`}
                            />
                        ))}
                    </div>

                    <div className="flex flex-col items-center gap-2 text-white/60 animate-bounce-subtle">
                        <span className="text-[10px] uppercase tracking-[0.2em] font-sans">{t("hero.discoverMore")}</span>
                        <FaChevronDown size={14} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
