import { createContext, useContext, useState, useCallback } from "react";
import pt from "./locales/pt.json";
import es from "./locales/es.json";
import en from "./locales/en.json";

const locales = { pt, es, en };

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
    const [locale, setLocaleState] = useState(() => {
        try {
            return localStorage.getItem("lang") || "pt";
        } catch {
            return "pt";
        }
    });

    const setLocale = useCallback((lang) => {
        setLocaleState(lang);
        try {
            localStorage.setItem("lang", lang);
        } catch {
            // localStorage unavailable
        }
    }, []);

    // t(key) — access nested keys like "hero.slides.0.title"
    const t = useCallback((key) => {
        const keys = key.split(".");
        let value = locales[locale];
        for (const k of keys) {
            if (value == null) return key;
            value = value[k];
        }
        return value ?? key;
    }, [locale]);

    return (
        <LanguageContext.Provider value={{ t, locale, setLocale }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
};

export default LanguageContext;
