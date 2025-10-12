// src/lib/mapImages.ts
import type { Language } from "./translations";
import { translations } from "./translations";
import aboutBg from "../assets/sections/about-bg.webp";
import motorImg from "../assets/motor.webp";
import backgroundSvg from "../assets/background.svg";

export interface ImageSection {
  image: ImageMetadata;
}

export const imageSections: Record<string, ImageSection> = {
  about: {
    image: aboutBg,
  },
  engineering: {
    image: motorImg,
  },
  innovation: {
    image: backgroundSvg,
  },
  careers: {
    image: aboutBg,
  },
  home: {
    image: aboutBg,
  },
};

// Función helper para obtener secciones disponibles
export function getAvailableSections(): string[] {
  return Object.keys(imageSections);
}

// Función helper para verificar si una sección existe
export function isValidSection(
  section: string
): section is keyof typeof imageSections {
  return section in imageSections;
}

// Función helper para obtener imagen por defecto
export function getDefaultSection(): string {
  return "home";
}

// Función helper para obtener datos de sección con fallback
export function getSectionData(
  section: string,
  locale: Language
): {
  image: ImageMetadata;
  alt: string;
  text: string;
  fallbackText: string;
  loading: string;
  error: string;
  section: string;
} | null {
  if (!isValidSection(section)) {
    section = getDefaultSection();
  }

  const data = imageSections[section];
  const t = translations[locale];

  if (!data) return null;

  const sectionKey = section as keyof typeof t.imageSections;

  return {
    image: data.image,
    alt: t.imageSections[sectionKey]?.alt || "",
    text: t.imageSections[sectionKey]?.text || "",
    fallbackText: t.imageContainer.fallbackText,
    loading: t.imageContainer.loading,
    error: t.imageContainer.error,
    section: t.imageContainer.section,
  };
}
