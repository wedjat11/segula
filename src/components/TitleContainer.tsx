import React from "react";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";

interface Props {
  locale: Language;
  className?: string;
  title?: string;
  subtitle?: string;
  normal?: string;
  section?: "main" | "business" | "about" | "services" | "careers" | "custom";
}

const TitleContainer: React.FC<Props> = ({
  locale,
  className = "",
  title,
  subtitle,
  normal,
  section = "main",
}) => {
  // Obtener traducciones del sistema principal
  const t = useTranslations(locale);

  // Función para obtener el contenido según la sección
  const getContent = () => {
    if (section === "custom") {
      return {
        title: title || "",
        subtitle: subtitle || "",
        description: normal || "",
      };
    }

    if (section === "main") {
      return {
        title: title || `${t.mainTitle.eachYear} ${t.mainTitle.atSegula}`,
        subtitle:
          subtitle ||
          `${t.mainTitle.weStartStory} ${t.mainTitle.thousandsNew} ${t.mainTitle.engineers}`,
        description: normal || t.mainTitle.whyNotYou,
      };
    }

    // Para otras secciones, usar sectionTitles si están disponibles
    if (section in t.sectionTitles) {
      const sectionData =
        t.sectionTitles[section as keyof typeof t.sectionTitles];
      return {
        title: title || sectionData.title,
        subtitle: subtitle || sectionData.subtitle,
        description: normal || sectionData.description,
      };
    }

    // Fallback
    return {
      title: title || t.mainTitle.atSegula,
      subtitle: subtitle || t.mainTitle.weStartStory,
      description: normal || t.mainTitle.whyNotYou,
    };
  };

  const content = getContent();

  // No renderizar si no hay contenido
  if (!content.title && !content.subtitle && !content.description) {
    return null;
  }

  return (
    <section
      className={`w-full bg-primary md:w-11/12 mx-auto rounded-lg overflow-hidden shadow-lg ${className}`}
      aria-labelledby="section-title"
      role="banner"
    >
      <div className="flex flex-col gap-6 py-8 px-4 md:flex-row items-center md:justify-between md:px-8 lg:px-12">
        {/* Título principal */}
        {content.title && (
          <div className="flex-1 md:flex-none">
            <h1
              id="section-title"
              className="text-center md:text-left text-white text-2xl font-bold md:text-3xl lg:text-4xl relative leading-tight"
            >
              {content.title}
              {/* Línea decorativa */}
              <span
                className="absolute -bottom-3 left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-1 bg-yellow-400 rounded-full"
                aria-hidden="true"
              ></span>
            </h1>
          </div>
        )}

        {/* Subtítulo y descripción */}
        {(content.subtitle || content.description) && (
          <div className="flex-1 text-center md:text-right space-y-3 max-w-2xl">
            {content.subtitle && (
              <h2 className="text-white font-semibold text-lg md:text-xl lg:text-2xl leading-tight">
                {content.subtitle}
              </h2>
            )}

            {content.description && (
              <p className="text-white/90 font-light text-base md:text-lg lg:text-xl leading-relaxed">
                {content.description}
              </p>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default TitleContainer;
