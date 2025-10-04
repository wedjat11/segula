import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import type { Language } from "../lib/translations";

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

interface LanguageSwitcherProps {
  currentLocale: Language;
  currentPath?: string;
  className?: string;
}

const languages: LanguageOption[] = [
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
];

/**
 * Genera URLs localizadas para navegación
 * @param locale - Idioma destino
 * @param path - Ruta actual (sin idioma)
 */
const getLocalizedUrl = (locale: Language, path: string = ""): string => {
  // Limpiar la ruta de cualquier prefijo de idioma existente
  const cleanPath = path.replace(/^\/(es|en|fr)/, "").replace(/^\/+/, "");

  // Para español (idioma por defecto), no agregar prefijo
  if (locale === "es") {
    return cleanPath ? `/${cleanPath}` : "/";
  }

  // Para otros idiomas, agregar prefijo
  return cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`;
};

/**
 * Extrae la ruta limpia sin el prefijo de idioma
 * @param currentPath - Ruta actual completa
 */
const getCleanPath = (currentPath: string): string => {
  return currentPath.replace(/^\/(es|en|fr)/, "") || "/";
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLocale,
  currentPath = "/",
  className = "",
}) => {
  const currentLang = languages.find((lang) => lang.code === currentLocale);

  const handleLanguageChange = (newLocale: string) => {
    const targetLocale = newLocale as Language;

    // Obtener la ruta limpia sin prefijo de idioma
    const cleanPath = getCleanPath(currentPath);

    // Construir la nueva URL con el idioma seleccionado
    const newUrl = getLocalizedUrl(targetLocale, cleanPath);

    // Navegar a la nueva URL (recarga la página para SEO óptimo)
    window.location.href = newUrl;
  };

  return (
    <div className={`w-fit ${className}`}>
      <Select value={currentLocale} onValueChange={handleLanguageChange}>
        <SelectTrigger className="w-full cursor-pointer text-white bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-colors focus:ring-2 focus:ring-white/30">
          <SelectValue
            placeholder="Seleccionar idioma"
            aria-label={`Idioma actual: ${currentLang?.name}`}
          >
            <div className="flex items-center space-x-2">
              <span
                className="text-lg"
                role="img"
                aria-label={`Bandera de ${currentLang?.name}`}
              >
                {currentLang?.flag}
              </span>
              <span className="text-sm font-medium hidden sm:inline">
                {currentLang?.name}
              </span>
            </div>
          </SelectValue>
        </SelectTrigger>

        <SelectContent className="bg-white/95 backdrop-blur-md border-white/20">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className="cursor-pointer hover:bg-gray-100/50 focus:bg-gray-100/50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <span
                  className="text-lg"
                  role="img"
                  aria-label={`Bandera de ${lang.name}`}
                >
                  {lang.flag}
                </span>
                <span className="text-sm font-medium text-gray-900">
                  {lang.name}
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSwitcher;
