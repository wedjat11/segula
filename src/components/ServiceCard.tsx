import React, { useState } from "react";
import { X } from "lucide-react";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";

// Interface simplificada para ServiceCard (ya procesada por idioma)
interface ProcessedService {
  id: string;
  title: string;
  icon?: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  bulletColor?: string;
  borderColor?: string;
}

interface Props {
  service: ProcessedService;
  locale: Language;
  isActive: boolean;
  isHovered?: boolean;
  variant: "desktop" | "mobile";
  onClose?: () => void;
}

const ServiceCard: React.FC<Props> = ({
  service,
  locale,
  isActive,
  isHovered = false,
  variant,
  onClose,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const t = useTranslations(locale);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  // Clases condicionales basadas en el estado
  const cardClasses = `
    relative overflow-hidden rounded-xl transition-all duration-500 ease-in-out
    ${variant === "desktop" ? "h-96" : "h-auto"}
    ${
      isActive
        ? "transform scale-105 shadow-2xl ring-2 ring-white/20"
        : "shadow-lg"
    }
    ${isHovered ? "shadow-xl" : ""}
    ${service.borderColor || "border-gray-600"}
    bg-gradient-to-br from-gray-900 to-gray-800
  `;

  return (
    <div className={cardClasses}>
      {/* Botón cerrar en mobile */}
      {variant === "mobile" && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors"
          aria-label={t.serviceCard.close}
        >
          <X size={20} />
        </button>
      )}

      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        {!imageLoaded && !imageError && (
          <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
            <div className="loading-spinner"></div>
          </div>
        )}

        {imageError && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            <div className="text-white/50 text-center">
              <svg
                className="w-12 h-12 mx-auto mb-2 opacity-50"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-xs">{t.serviceCard.imageError}</p>
            </div>
          </div>
        )}

        <img
          src={service.imageSrc}
          alt={service.imageAlt}
          className={`w-full h-full object-cover transition-all duration-500 ${
            imageLoaded && !imageError ? "opacity-60" : "opacity-0"
          } ${isActive ? "scale-110" : "scale-100"}`}
          onLoad={handleImageLoad}
          onError={handleImageError}
          loading="lazy"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 p-6 h-full flex flex-col justify-end">
        {/* Icono del servicio */}
        {service.icon && (
          <div className="mb-4">
            <img
              src={service.icon}
              alt=""
              className="w-12 h-12 filter brightness-0 invert"
              aria-hidden="true"
            />
          </div>
        )}

        {/* Título */}
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
          {service.title}
        </h3>

        {/* Descripción */}
        <p className="text-white/90 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
          {service.description}
        </p>

        {/* Features */}
        {service.features && service.features.length > 0 && (
          <div className="mb-4">
            <h4 className="text-white font-semibold mb-2 text-sm uppercase tracking-wide">
              {t.serviceCard.features}
            </h4>
            <ul className="space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <li
                  key={index}
                  className="text-white/80 text-xs md:text-sm flex items-start"
                >
                  <span className="w-1.5 h-1.5 bg-white rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  <span className="line-clamp-2">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-auto pt-4">
          <button
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors duration-300 font-medium text-sm"
            aria-label={`${t.serviceCard.learnMore} ${service.title}`}
          >
            {t.serviceCard.learnMore}
            <svg
              className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
