import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Language } from "../lib/translations";

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
  return (
    <section
      className={`flex  w-full lg:w-11/12 mx-auto pt-5 justify-between ${className}`}
    >
      {/* Enlace al sitio del grupo */}
      <a
        href="https://github.com/jesusalfonso/segula"
        className="bg-primary text-white px-4 py-2 rounded-md hidden lg:flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Visitar sitio del grupo Segula"
      >
        <p>Group Site</p>
      </a>

      {/* Logo - Enlace localizado */}
      <div className="w-1/2 lg:max-w-sm">
        <a
          href={currentLocale === "es" ? "/" : `/${currentLocale}`}
          aria-label="Ir a página de inicio"
        >
          <img
            src="/src/assets/logoSegula.png"
            alt="Segula Technologies Logo"
            className="h-auto w-full object-contain"
            loading="eager"
          />
        </a>
      </div>

      {/* Selector de idioma */}
      <div className="flex items-center">
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
