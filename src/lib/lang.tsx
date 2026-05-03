import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Lang = "en" | "ur";
interface Ctx { lang: Lang; setLang: (l: Lang) => void; t: (en: string, ur: string) => string; }

const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (en) => en });

export const LangProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "en");

  useEffect(() => {
    localStorage.setItem("lang", lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ur" ? "rtl" : "ltr";
  }, [lang]);

  const setLang = (l: Lang) => setLangState(l);
  const t = (en: string, ur: string) => (lang === "ur" ? ur : en);

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
};

export const useLang = () => useContext(LangContext);
