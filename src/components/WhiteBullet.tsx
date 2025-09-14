interface Props {
  icon?: string;
  className?: string;
  lang?: "es" | "en" | "fr";
  title: string;
  alt?: string;
  onClick?: () => void;
  isActive?: boolean; // Nueva prop opcional
  isInactive?: boolean; // Nueva prop opcional para estado "apagado"
  bulletColor?: string; // Nueva prop opcional para color del bullet
}

export default function WhiteBullet({
  className = "",
  lang = "es",
  title,
  icon,
  alt,
  onClick,
  isActive = false,
  isInactive = false,
  bulletColor = "bg-primary",
}: Props) {
  // Determinar si el componente es clickeable
  const isClickable = onClick !== undefined;

  // Clases base del componente con estados mejorados
  const baseClasses = `
      flex items-center gap-3 p-3 backdrop-blur-sm rounded-full 
      border transition-all duration-500 w-[120px] md:w-[250px] lg:w-[220px] 
      text-xs font-semibold md:text-lg lg:text-2xl justify-center
      ${
        isActive
          ? "bg-white text-gray-900 border-white shadow-xl"
          : isInactive
          ? "bg-gray-700/50 text-gray-400 border-gray-600/50"
          : "bg-semiwhite text-primary border-white/20"
      }
    `;

  // Clases condicionales para hover y cursor
  // En desktop no necesita cursor-pointer si no tiene onClick
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

  return (
    <div
      className={combinedClasses}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      aria-pressed={isActive}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
    >
      {icon ? (
        <img
          src={icon}
          alt={alt || title}
          className={`w-5 h-5 flex-shrink-0 object-contain transition-opacity duration-500
              ${isInactive ? "opacity-50" : "opacity-100"}`}
        />
      ) : (
        <div
          className={`size-2 md:size-4 rounded-full transition-all duration-500 
            ${
              isActive
                ? "bg-gray-900"
                : isInactive
                ? "bg-gray-500"
                : bulletColor || "bg-primary"
            }`}
        />
      )}
      <span className="transition-colors duration-500">{title}</span>
    </div>
  );
}
