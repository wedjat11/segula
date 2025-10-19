import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";
import logoSegula from "../assets/logoSegula.png";

interface MainHeaderProps {
  currentLocale: Language;
  currentPath?: string;
  className?: string;
}

const MainHeader: React.FC<MainHeaderProps> = ({
  currentLocale,
  currentPath = "/",
  className = "",
}) => {
  const t = useTranslations(currentLocale);

  return (
    <section
      className={`flex  w-full lg:w-11/12 mx-auto pt-5 justify-between ${className}`}
    >
      {/* Enlace al sitio del grupo */}
      <a
        href="https://github.com/jesusalfonso/segula"
        className="backdrop-blur-md bg-primary/70 border border-primary/80 text-white px-4 rounded-full h-10 shadow-lg hover:bg-primary/80 hover:border-white/20 transition-all duration-300 hidden lg:flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.header.groupSiteAria}
      >
        <p>{t.header.groupSite}</p>
      </a>

      {/* Logo - Enlace localizado */}
      <div className="w-1/2 lg:max-w-sm">
        <a
          href={currentLocale === "es" ? "/" : `/${currentLocale}`}
          aria-label={t.header.logoAria}
        >
          <img
            src={logoSegula.src}
            alt="Segula Technologies Logo"
            className="h-auto w-full object-contain"
            loading="eager"
          />
        </a>
      </div>

      {/* Selector de idioma */}
      <div className="flex ">
        <LanguageSwitcher
          currentLocale={currentLocale}
          currentPath={currentPath}
          className="z-50"
        />
      </div>
    </section>
  );
};

export default MainHeader;
