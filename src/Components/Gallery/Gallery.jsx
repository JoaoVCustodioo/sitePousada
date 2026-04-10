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
    { src: fotoQuartoMain, srcWebp: fotoQuartoMainWebp, alt: "Pousada overview", category: "areas_comuns" },
    { src: acomodacoesMain, srcWebp: acomodacoesMainWebp, alt: "Acomodações details", category: "areas_comuns" },
    { src: kombi, srcWebp: kombiWebp, alt: "Madagaskombi", category: "areas_comuns" },
    { src: cafe, srcWebp: cafeWebp, alt: "Breakfast", category: "cafe_da_manha" },
    { src: cafe1, srcWebp: cafe1Webp, alt: "Breakfast details", category: "cafe_da_manha" },
    { src: cafe2, srcWebp: cafe2Webp, alt: "Breakfast table", category: "cafe_da_manha" },
    { src: cafe3, srcWebp: cafe3Webp, alt: "Breakfast items", category: "cafe_da_manha" },
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
