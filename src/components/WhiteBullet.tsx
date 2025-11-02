import React from "react";
import type { Language } from "../lib/translations";

interface Props {
  icon?: string;
  className?: string;
  locale?: Language; // Cambio: lang -> locale
  title: string;
  alt?: string;
  onClick?: () => void;
  isActive?: boolean;
  isInactive?: boolean;
  bulletColor?: string;
  variant?: 'default' | 'nosotros'; // Nueva prop para diferenciar variantes
}

const WhiteBullet: React.FC<Props> = ({
  className = "",
  locale = "es", // Cambio: lang -> locale
  title,
  icon,
  alt,
  onClick,
  isActive = false,
  isInactive = false,
  bulletColor = "bg-primary",
  variant = 'default',
}) => {
  // Determinar si el componente es clickeable
  const isClickable = onClick !== undefined;

  // Mapeo de iconos según el título (solo para variant default)
  const getIconForTitle = (title: string) => {
    if (variant === 'nosotros') return null;

    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('automotriz') || lowerTitle.includes('automotive')) return '🚗';
    if (lowerTitle.includes('energia') || lowerTitle.includes('energía')) return '⚡';
    if (lowerTitle.includes('vehiculos') || lowerTitle.includes('vehículos') || lowerTitle.includes('industrial vehicles')) return '⚙️';
    if (lowerTitle.includes('aerospace')) return '✈️';
    return null;
  };

  const titleIcon = getIconForTitle(title);

  // Determinar si debe mostrar el punto negro
  const showBulletPoint = variant === 'nosotros' && !icon;

  // Clases base del componente con estados mejorados
  const baseClasses = `
    flex items-center gap-3 p-3 backdrop-blur-sm rounded-full
    border transition-all duration-500 ${variant === 'nosotros' ? 'w-[250px]' : 'w-auto whitespace-nowrap'}
    text-xs font-semibold md:text-lg lg:text-2xl justify-center px-4
    ${
      isActive
        ? "bg-white text-gray-900 border-white shadow-xl"
        : isInactive
        ? "bg-gray-700/50 text-gray-400 border-gray-600/50"
        : "bg-semiwhite text-primary border-white/20"
    }
  `;

  // Clases condicionales para hover y cursor
  const interactiveClasses =
    isClickable && !isInactive
      ? "hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-xl cursor-pointer active:scale-95"
      : isClickable
      ? "cursor-pointer"
      : !isInactive
      ? "hover:bg-white hover:text-gray-900 hover:border-white hover:shadow-xl"
      : "";

  // Combinar todas las clases
  const combinedClasses = `${baseClasses} ${interactiveClasses} ${className}`;

  // Handler para eventos de teclado
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isClickable && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-pressed={isClickable ? isActive : undefined}
      aria-label={alt || title}
      onKeyDown={isClickable ? handleKeyDown : undefined}
    >
      {/* Icono personalizado */}
      {icon && (
        <img
          src={icon}
          alt={alt || title}
          className={`w-5 h-5 flex-shrink-0 object-contain transition-opacity duration-500 ${
            isInactive ? "opacity-50" : "opacity-100"
          }`}
        />
      )}

      {/* Bullet point - solo para variant nosotros */}
      {showBulletPoint && (
        <div
          className={`size-2 md:size-4 rounded-full transition-all duration-500 ${
            isActive
              ? "bg-gray-900"
              : isInactive
              ? "bg-gray-500"
              : bulletColor || "bg-primary"
          }`}
          aria-hidden="true"
        />
      )}

      {/* Icono específico del título - solo para variant default */}
      {titleIcon && (
        <span className="text-base md:text-xl" style={{ marginLeft: '5px' }}>
          {titleIcon}
        </span>
      )}

      {/* Título */}
      <span className="transition-colors duration-500 leading-tight">
        {title}
      </span>
    </div>
  );
};

export default WhiteBullet;
