import english from "./english.js";
import finnish from "./finnish.js";
const languages = {en: english, fi: finnish};

const getLanguage = () => {
  const lang = localStorage.getItem("lang") || "fi";
  return languages[lang] ?? languages.fi;
};

const setLanguage = (lang) => {
  if (languages[lang]) {
    localStorage.setItem("lang", lang);
    window.location.reload();
  }
};

export {languages, getLanguage, setLanguage};
