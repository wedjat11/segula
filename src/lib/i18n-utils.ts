// src/lib/i18n-utils.ts
import type { Language, Translations } from "./translations";
import { translations } from "./translations";

/**
 * Obtiene las traducciones para un idioma específico
 * Compatible tanto con componentes Astro como React
 */
export function getTranslations(locale: Language): Translations {
  return translations[locale] || translations.es;
}

/**
 * Hook para usar en componentes React
 * Recibe el idioma como prop desde Astro
 */
export function useTranslations(locale: Language): Translations {
  return getTranslations(locale);
}

/**
 * Genera URLs localizadas para navegación
 * Usado principalmente en componentes React para enlaces
 */
export function getLocalizedUrl(locale: Language, path: string = ""): string {
  // Normalizar para asegurar barra inicial
  const normalized = path.startsWith("/") ? path : `/${path}`;

  // Limpiar prefijo de idioma si existe
  const cleanPath = normalized
    .replace(/^\/(es|en|fr)(\/|$)/, "/")
    .replace(/^\/+/, "");

  // Para español (idioma por defecto), no agregar prefijo
  if (locale === "es") {
    return cleanPath ? `/${cleanPath}` : "/";
  }

  // Para otros idiomas, agregar prefijo
  return cleanPath ? `/${locale}/${cleanPath}` : `/${locale}`;
}

/**
 * Extrae el idioma actual de la URL
 * Útil para componentes que necesitan detectar el idioma
 */
export function getCurrentLocale(url: URL | string): Language {
  const pathname = typeof url === "string" ? url : url.pathname;

  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/fr")) return "fr";
  return "es";
}

/**
 * Extrae la ruta limpia sin el prefijo de idioma
 * Útil para mantener la navegación entre idiomas
 */
export function getCleanPath(currentPath: string): string {
  return currentPath.replace(/^\/(es|en|fr)/, "") || "/";
}

/**
 * Obtiene todos los idiomas disponibles
 * Útil para generar enlaces de navegación entre idiomas
 */
export function getAvailableLocales(): Language[] {
  return ["es", "en", "fr"];
}

/**
 * Verifica si un idioma es válido
 */
export function isValidLocale(locale: string): locale is Language {
  return ["es", "en", "fr"].includes(locale as Language);
}

/**
 * Obtiene el idioma por defecto
 */
export function getDefaultLocale(): Language {
  return "es";
}

/**
 * Genera meta tags localizados para SEO
 * Útil en componentes Layout
 */
export function getLocalizedMeta(locale: Language) {
  const t = getTranslations(locale);

  return {
    title: {
      es: "Segula Technologies - Únete a nuestro equipo de ingenieros",
      en: "Segula Technologies - Join our team of engineers",
      fr: "Segula Technologies - Rejoignez notre équipe d'ingénieurs",
    }[locale],
    description: {
      es: "Únete a miles de ingenieros en Segula Technologies. Oportunidades profesionales en tecnología, ingeniería, manufactura y más sectores innovadores.",
      en: "Join thousands of engineers at Segula Technologies. Professional opportunities in technology, engineering, manufacturing and other innovative sectors.",
      fr: "Rejoignez des milliers d'ingénieurs chez Segula Technologies. Opportunités professionnelles en technologie, ingénierie, fabrication et autres secteurs innovants.",
    }[locale],
    lang: locale,
    hreflang: {
      es: "/",
      en: "/en/",
      fr: "/fr/",
    },
  };
}
