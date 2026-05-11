import { useState, useCallback } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

import kombi from "../../assets/images/kombi.jpg";
import cafe from "../../assets/images/cafe.jpg";
import cafe1 from "../../assets/images/cafe1.jpeg";
import cafe2 from "../../assets/images/cafe2.jpeg";
import cafe3 from "../../assets/images/cafe3.jpeg";
import parquinho from "../../assets/images/parquinho.JPG";
import parquinho1 from "../../assets/images/parquinho1.JPG";
import parquinho2 from "../../assets/images/parquinho2.jpg";
import parquinho3 from "../../assets/images/parquinho3.jpg";
import exterior1 from "../../assets/images/IMG_6235.jpg";
import exterior2 from "../../assets/images/IMG_6238.jpg";
import exterior3 from "../../assets/images/IMG_6246.jpg";
import exterior4 from "../../assets/images/IMG_6254.jpg";
import exterior5 from "../../assets/images/IMG_6255.jpg";
import exterior6 from "../../assets/images/IMG_6258.jpg";
import exterior7 from "../../assets/images/IMG_6263.jpg";
import exterior8 from "../../assets/images/IMG_6265.jpg";
import exterior9 from "../../assets/images/IMG_6268.jpg";
import exterior10 from "../../assets/images/IMG_6275.jpg";
import exterior11 from "../../assets/images/IMG_6282.jpg";
import exterior12 from "../../assets/images/IMG_6292.jpg";
import fotoQuartoMain from "../../assets/images/fotoNossosQuartosMain.jpg";
import acomodacoesMain from "../../assets/images/acomodacoesMain.jpg";
import duplo from "../../assets/images/Duplo/duploFoto.jpeg";
import duplo1 from "../../assets/images/Duplo/duploFoto1.jpeg";
import triplo from "../../assets/images/Triplo/triplo.jpeg";
import quadruplo from "../../assets/images/Quadruplo/quadruplo.jpeg";
import quadruplo1 from "../../assets/images/Quadruplo/quadruplo1.jpeg";
import triploVaranda from "../../assets/images/TriploVaranda/triploVaranda.jpeg";
import quadruploVaranda from "../../assets/images/QuadruploVaranda/quadruploVaranda.jpeg";
import quintuplo from "../../assets/images/QuintuploVaranda/quintuplo.jpeg";

// WebP desktop (lazy, below the fold)
import kombiWebp from '../../assets/images/kombi-desktop.webp'
import cafeWebp from '../../assets/images/cafe-desktop.webp'
import cafe1Webp from '../../assets/images/cafe1-desktop.webp'
import cafe2Webp from '../../assets/images/cafe2-desktop.webp'
import cafe3Webp from '../../assets/images/cafe3-desktop.webp'
import parquinhoWebp from '../../assets/images/parquinho-desktop.webp'
import parquinho1Webp from '../../assets/images/parquinho1-desktop.webp'
import parquinho2Webp from '../../assets/images/parquinho2-desktop.webp'
import parquinho3Webp from '../../assets/images/parquinho3-desktop.webp'
import exterior1Webp from '../../assets/images/IMG_6235-desktop.webp'
import exterior2Webp from '../../assets/images/IMG_6238-desktop.webp'
import exterior3Webp from '../../assets/images/IMG_6246-desktop.webp'
import exterior4Webp from '../../assets/images/IMG_6254-desktop.webp'
import exterior5Webp from '../../assets/images/IMG_6255-desktop.webp'
import exterior6Webp from '../../assets/images/IMG_6258-desktop.webp'
import exterior7Webp from '../../assets/images/IMG_6263-desktop.webp'
import exterior8Webp from '../../assets/images/IMG_6265-desktop.webp'
import exterior9Webp from '../../assets/images/IMG_6268-desktop.webp'
import exterior10Webp from '../../assets/images/IMG_6275-desktop.webp'
import exterior11Webp from '../../assets/images/IMG_6282-desktop.webp'
import exterior12Webp from '../../assets/images/IMG_6292-desktop.webp'
import fotoQuartoMainWebp from '../../assets/images/fotoNossosQuartosMain-desktop.webp'
import acomodacoesMainWebp from '../../assets/images/acomodacoesMain-desktop.webp'
import duploWebp from '../../assets/images/Duplo/duploFoto-desktop.webp'
import duplo1Webp from '../../assets/images/Duplo/duploFoto1-desktop.webp'
import triploWebp from '../../assets/images/Triplo/triplo-desktop.webp'
import quadruploWebp from '../../assets/images/Quadruplo/quadruplo-desktop.webp'
import quadruplo1Webp from '../../assets/images/Quadruplo/quadruplo1-desktop.webp'
import triploVarandaWebp from '../../assets/images/TriploVaranda/triploVaranda-desktop.webp'
import quadruploVarandaWebp from '../../assets/images/QuadruploVaranda/quadruploVaranda-desktop.webp'
import quintuploWebp from '../../assets/images/QuintuploVaranda/quintuplo-desktop.webp'

const allPhotos = [
    { src: fotoQuartoMain, srcWebp: fotoQuartoMainWebp, alt: "Room overview", category: "quartos" },
    { src: acomodacoesMain, srcWebp: acomodacoesMainWebp, alt: "Room details", category: "quartos" },
    { src: kombi, srcWebp: kombiWebp, alt: "Madagaskombi", category: "areas_comuns" },
    { src: exterior1, srcWebp: exterior1Webp, alt: "Pousada exterior", category: "areas_comuns" },
    { src: exterior2, srcWebp: exterior2Webp, alt: "Pousada exterior detail", category: "areas_comuns" },
    { src: exterior3, srcWebp: exterior3Webp, alt: "Pousada outdoor area", category: "areas_comuns" },
    { src: exterior4, srcWebp: exterior4Webp, alt: "Pousada facade", category: "areas_comuns" },
    { src: exterior5, srcWebp: exterior5Webp, alt: "Pousada common area", category: "areas_comuns" },
    { src: exterior6, srcWebp: exterior6Webp, alt: "Pousada outdoor view", category: "areas_comuns" },
    { src: exterior7, srcWebp: exterior7Webp, alt: "Pousada garden", category: "areas_comuns" },
    { src: exterior8, srcWebp: exterior8Webp, alt: "Pousada exterior view", category: "areas_comuns" },
    { src: exterior9, srcWebp: exterior9Webp, alt: "Pousada entrance", category: "areas_comuns" },
    { src: exterior10, srcWebp: exterior10Webp, alt: "Pousada leisure area", category: "areas_comuns" },
    { src: exterior11, srcWebp: exterior11Webp, alt: "Pousada outdoor seating", category: "areas_comuns" },
    { src: exterior12, srcWebp: exterior12Webp, alt: "Pousada exterior space", category: "areas_comuns" },
    { src: cafe, srcWebp: cafeWebp, alt: "Breakfast", category: "cafe_da_manha" },
    { src: cafe1, srcWebp: cafe1Webp, alt: "Breakfast details", category: "cafe_da_manha" },
    { src: cafe2, srcWebp: cafe2Webp, alt: "Breakfast table", category: "cafe_da_manha" },
    { src: cafe3, srcWebp: cafe3Webp, alt: "Breakfast items", category: "cafe_da_manha" },
    { src: exterior1, srcWebp: exterior1Webp, alt: "Breakfast room", category: "cafe_da_manha" },
    { src: exterior2, srcWebp: exterior2Webp, alt: "Breakfast room detail", category: "cafe_da_manha" },
    { src: exterior3, srcWebp: exterior3Webp, alt: "Breakfast seating area", category: "cafe_da_manha" },
    { src: parquinho, srcWebp: parquinhoWebp, alt: "Playground overview", category: "areas_comuns" },
    { src: parquinho1, srcWebp: parquinho1Webp, alt: "Playground slide", category: "areas_comuns" },
    { src: parquinho2, srcWebp: parquinho2Webp, alt: "Playground area", category: "areas_comuns" },
    { src: parquinho3, srcWebp: parquinho3Webp, alt: "Playground details", category: "areas_comuns" },
    { src: duplo, srcWebp: duploWebp, alt: "Double Room", category: "quartos" },
    { src: duplo1, srcWebp: duplo1Webp, alt: "Double Room detail", category: "quartos" },
    { src: triplo, srcWebp: triploWebp, alt: "Triple Room", category: "quartos" },
    { src: quadruplo, srcWebp: quadruploWebp, alt: "Quadruple Room", category: "quartos" },
    { src: quadruplo1, srcWebp: quadruplo1Webp, alt: "Quadruple Room detail", category: "quartos" },
    { src: triploVaranda, srcWebp: triploVarandaWebp, alt: "Triple Room w/ Balcony", category: "quartos" },
    { src: quadruploVaranda, srcWebp: quadruploVarandaWebp, alt: "Quadruple Room w/ Balcony", category: "quartos" },
    { src: quintuplo, srcWebp: quintuploWebp, alt: "Quintuple Room w/ Balcony", category: "quartos" },
];

const categoryKeys = ["todos", "quartos", "areas_comuns", "cafe_da_manha"];

const Gallery = () => {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState("todos");
    const [lightboxIndex, setLightboxIndex] = useState(null);

    const filteredPhotos = activeCategory === "todos"
        ? allPhotos
        : allPhotos.filter((p) => p.category === activeCategory);

    const openLightbox = (index) => {
        setLightboxIndex(index);
        document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
        setLightboxIndex(null);
        document.body.style.overflow = "";
    };

    const navigate = useCallback((dir) => {
        setLightboxIndex((prev) => {
            const len = filteredPhotos.length;
            return dir === "next" ? (prev + 1) % len : (prev - 1 + len) % len;
        });
    }, [filteredPhotos.length]);

    const handleKeyDown = useCallback((e) => {
        if (e.key === "Escape") closeLightbox();
        if (e.key === "ArrowRight") navigate("next");
        if (e.key === "ArrowLeft") navigate("prev");
    }, [navigate]);

    return (
        <section id="galeria" className="section-padding bg-primary">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10" data-aos="fade-up">
                    <p className="section-subtitle">{t("gallery.subtitle")}</p>
                    <h2 className="section-title mb-6">{t("gallery.title")}</h2>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mb-12" data-aos="fade-up" data-aos-delay="100">
                    {categoryKeys.map((key) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`px-5 py-2 text-xs font-semibold tracking-[0.15em] uppercase rounded-full border transition-all duration-300 ${activeCategory === key
                                ? "bg-secondary text-white border-secondary"
                                : "bg-transparent text-dark/60 border-dark/15 hover:border-secondary/50 hover:text-secondary"
                                }`}
                        >
                            {t(`gallery.categories.${key}`)}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                    {filteredPhotos.map((photo, index) => (
                        <div
                            key={`${photo.alt}-${index}`}
                            data-aos="fade-up"
                            data-aos-delay={Math.min(index * 50, 300)}
                            className={`relative overflow-hidden rounded-sm cursor-pointer group ${index === 0 ? "col-span-2 row-span-2" : ""
                                }`}
                            onClick={() => openLightbox(index)}
                        >
                            <picture>
                                <source srcSet={photo.srcWebp} type="image/webp" />
                                <img
                                    src={photo.src}
                                    alt={photo.alt}
                                    width={800}
                                    height={600}
                                    loading="lazy"
                                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${index === 0 ? "h-full min-h-[300px] md:min-h-[400px]" : "aspect-square h-full"
                                        }`}
                                />
                            </picture>
                            <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-500 flex items-center justify-center">
                                <span className="text-white font-sans text-xs uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                                    {t("gallery.viewPhoto")}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

            </div>

            {/* Lightbox */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex items-center justify-center"
                    onClick={closeLightbox}
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                    role="dialog"
                    aria-modal="true"
                    ref={(el) => el && el.focus()}
                >
                    <button onClick={closeLightbox} className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10" aria-label={t("gallery.close")}>
                        <FaTimes size={24} />
                    </button>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigate("prev"); }}
                        className="absolute left-4 md:left-8 text-white/50 hover:text-white transition-colors z-10"
                        aria-label={t("gallery.prev")}
                    >
                        <FaChevronLeft size={28} />
                    </button>

                    <picture>
                        <source srcSet={filteredPhotos[lightboxIndex]?.srcWebp} type="image/webp" />
                        <img
                            src={filteredPhotos[lightboxIndex]?.src}
                            alt={filteredPhotos[lightboxIndex]?.alt}
                            className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </picture>

                    <button
                        onClick={(e) => { e.stopPropagation(); navigate("next"); }}
                        className="absolute right-4 md:right-8 text-white/50 hover:text-white transition-colors z-10"
                        aria-label={t("gallery.next")}
                    >
                        <FaChevronRight size={28} />
                    </button>

                    <div className="absolute bottom-6 text-white/50 text-sm font-sans">
                        {lightboxIndex + 1} / {filteredPhotos.length}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Gallery;
