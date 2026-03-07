import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { useLanguage } from "../../i18n/LanguageContext";

const FaqItem = ({ item, isOpen, onClick }) => (
    <div className="border border-dark/5 rounded-sm overflow-hidden bg-white">
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between px-6 md:px-8 py-5 md:py-6 text-left bg-transparent hover:bg-dimwhite/50 transition-colors duration-300"
            aria-expanded={isOpen}
        >
            <span className="text-dark text-sm md:text-base font-sans font-medium pr-4 leading-relaxed">
                {item.question}
            </span>
            <span className={`flex-shrink-0 w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center transition-all duration-300 ${isOpen ? "bg-secondary border-secondary text-white rotate-0" : "text-dark/40"
                }`}>
                {isOpen ? <FaMinus size={10} /> : <FaPlus size={10} />}
            </span>
        </button>

        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
            }`}>
            <div className="px-6 md:px-8 pb-6 md:pb-8">
                <p className="text-dark/60 text-sm md:text-base font-sans leading-relaxed border-t border-dark/5 pt-5">
                    {item.answer}
                </p>
            </div>
        </div>
    </div>
);

const Faq = () => {
    const { t } = useLanguage();
    const items = t("faq.items");
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="section-padding bg-primary">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-14" data-aos="fade-up">
                    <p className="section-subtitle">{t("faq.subtitle")}</p>
                    <h2 className="section-title mb-6">{t("faq.title")}</h2>
                    <p className="text-dark/60 text-sm md:text-base font-sans">
                        {t("faq.description")}
                    </p>
                </div>

                <div className="flex flex-col gap-3" data-aos="fade-up" data-aos-delay="100">
                    {items.map((item, index) => (
                        <FaqItem
                            key={index}
                            item={item}
                            isOpen={openIndex === index}
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Faq;
