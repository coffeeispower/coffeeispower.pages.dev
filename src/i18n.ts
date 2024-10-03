
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import resourcesToBackend from 'i18next-resources-to-backend';
import LanguageDetector from 'i18next-browser-languagedetector'

i18n
    .use(LanguageDetector)
    .use(resourcesToBackend((language: string, namespace: string) => {
        const t = import(`./translations/${language}/${namespace}.json`);
        t.then(console.log)
        return t;
    }))
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        fallbackLng: "pt",
        interpolation: {
            escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
        },
        supportedLngs: ['pt', "en", "ja"],
        ns: ["home"]
    });
