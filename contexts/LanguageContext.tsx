"use client"
import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "id";

interface Translations {
  [key: string]: {
    en: string;
    id: string;
  };
}

const translations: Translations = {
  labName: {
    en: "Biro Pengkajian dan Pemanfaatan Tenaga Listrik",
    id: "Biro Pengkajian dan Pemanfaatan Tenaga Listrik",
  },
  "nav.home": { en: "Home", id: "Beranda" },
  "nav.ourTeam": { en: "Our Team", id: "Tim Kami" },
  "nav.activity": { en: "Activity", id: "Aktivitas" },
  "nav.practicum": { en: "Lab Work", id: "Praktikum" },
  "nav.research": { en: "Research", id: "Proyek Penelitian" },
  "nav.resource": { en: "Resource", id: "Sumber Daya" },
  "footer.about": { en: "About", id: "Tentang" },
  "footer.aboutText": {
    en: "A leading research laboratory dedicated to innovation and excellence in scientific discovery.",
    id: "Laboratorium penelitian terkemuka yang berdedikasi pada inovasi dan keunggulan dalam penemuan ilmiah.",
  },
  "footer.quickLinks": { en: "Quick Links", id: "Tautan Cepat" },
  "footer.contact": { en: "Contact", id: "Kontak" },
  "footer.rights": { en: "All rights reserved.", id: "Hak cipta dilindungi." },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
