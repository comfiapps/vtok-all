import la_en from "./lang/la-en";
import la_ko from "./lang/la-ko";

const pathname = window.location.pathname;
const mPath = pathname.length < 1 ? "" : pathname.substring(1);

export const languages = [
    {
        key: "",
        short: "KOR",
        name: "korean",
        source: la_ko
    },
    {
        key: "en",
        short: "ENG",
        name: "english",
        source: la_en
    },
];

const lang = languages.find(({key}) => key === mPath);

const language = () => {
    if (lang === undefined) return lang[0].source;
    return lang.source;
}

export const getCurrentLanguageKey = () => {
    if (lang === undefined) return "";
    return lang.key;
}

export const switchLanguage = (key) => {
    if (getCurrentLanguageKey() !== key) window.location.pathname = "/" + key;
}

const strings = language();

export default strings;
