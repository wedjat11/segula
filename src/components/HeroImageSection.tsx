// src/components/HeroImageSection.tsx
import React, { useMemo, useState } from "react";
import clsx from "clsx";
import { ArrowDown } from "lucide-react";
import {
  getSectionData,
  getDefaultSection,
  isValidSection,
} from "@/lib/mapImages";
import type { Language } from "../lib/translations";
import MainHeader from "./MainHeader";
import MainMenu from "./MainMenu";

export type SectionKey = string;

interface Props {
  section?: SectionKey;
  locale: Language;
  currentPath?: string;
  className?: string;
}

const HeroImageSection: React.FC<Props> = ({
  section,
  locale,
  currentPath = "/",
  className,
}) => {
  // Usar sección válida o por defecto
  const validSection =
    section && isValidSection(section) ? section : getDefaultSection();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Obtener datos de la sección usando helper
  const sectionData = useMemo(
    () => getSectionData(validSection, locale),
    [validSection, locale]
  );

  const imgSrc = sectionData?.image?.src ?? "";
  const imgAlt = sectionData?.alt ?? `Segula Technologies - ${validSection}`;
  const displayText = sectionData?.text ?? sectionData?.fallbackText;

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    console.warn(`Error loading image: ${imgSrc} for section: ${validSection}`);
  };

  return (
    <section
      className={clsx(
        "relative w-full h-screen overflow-hidden flex flex-col",
        className
      )}
      aria-label={`${sectionData?.section}: ${validSection}`}
    >
      {/* Header - sobre todo el contenido */}
      <div className="absolute top-0 left-0 right-0 z-30">
        <MainHeader currentLocale={locale} currentPath={currentPath} />
      </div>

      {/* Menu - debajo del header */}
      <div className="absolute top-20 left-0 right-0 z-30">
        <MainMenu locale={locale} />
      </div>

      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent z-10"></div>

      {/* Loading placeholder */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-center text-white">
            <div className="loading-spinner mx-auto mb-2"></div>
            <p className="text-sm opacity-75" aria-live="polite">
              {sectionData?.loading}
            </p>
          </div>
        </div>
      )}

      {/* Error fallback */}
      {imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
          <div className="text-white text-center">
            <svg
              className="w-16 h-16 mx-auto mb-4 opacity-50"
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm opacity-75" role="alert">
              {sectionData?.error}
            </p>
          </div>
        </div>
      )}

      {/* Imagen de fondo */}
      {imgSrc && (
        <img
          src={imgSrc}
          alt={imgAlt}
          className={clsx(
            "w-full h-full object-cover transition-opacity duration-500",
            imageLoaded && !imageError ? "opacity-100" : "opacity-0"
          )}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="eager"
        />
      )}

      {/* Texto descriptivo */}
      {displayText && (
        <div className="absolute inset-x-0 bottom-24 z-20 p-4 md:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-sm md:text-xl font-light md:font-normal leading-relaxed drop-shadow-lg">
              {displayText}
            </p>
          </div>
        </div>
      )}

      {/* Scroll Button - centrado en la parte inferior */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex cursor-pointer items-center backdrop-blur-lg justify-center size-10 md:size-12 lg:size-16 bg-primary/50 text-white rounded-full hover:bg-primary/60 transition-all duration-300 shadow-lg hover:shadow-xl animate-bounce">
          <a href="#about" aria-label="Scroll to content">
            <ArrowDown className="w-5 md:w-7 lg:w-10" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroImageSection;
