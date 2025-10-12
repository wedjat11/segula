import React, { useMemo, useState } from "react";
import clsx from "clsx";
import {
  getSectionData,
  getDefaultSection,
  isValidSection,
} from "@/lib/mapImages";
import type { Language } from "../lib/translations";

export type SectionKey = string;

interface Props {
  section?: SectionKey;
  locale: Language;
  className?: string;
}

const MainImageContainer: React.FC<Props> = ({
  section,
  locale,
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
      className={clsx("relative w-screen md:max-h-[650px]", className)}
      aria-label={`${sectionData?.section}: ${validSection}`}
    >
      {/* Gradiente overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/20 to-transparent z-10"></div>

      {/* Contenedor de imagen */}
      <div className="w-full h-[300px] md:h-[65vh] overflow-hidden relative">
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

        {/* Imagen principal */}
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
            loading="eager" // Carga inmediata para imagen principal
          />
        )}
      </div>

      {/* Texto descriptivo */}
      {displayText && (
        <div className="absolute inset-x-0 bottom-0 z-20 p-4 md:p-8">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-white text-sm md:text-xl font-light md:font-normal leading-relaxed drop-shadow-lg">
              {displayText}
            </p>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 z-20">
        <span className="bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
          {validSection.charAt(0).toUpperCase() + validSection.slice(1)}
        </span>
      </div>
    </section>
  );
};

export default MainImageContainer;
