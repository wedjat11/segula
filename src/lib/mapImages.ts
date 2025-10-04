// src/lib/mapImages.ts
import type { Language } from "./translations";

export interface ImageSection {
  image: string;
  alt: Record<Language, string>;
  es: string;
  en: string;
  fr: string;
}

export const imageSections: Record<string, ImageSection> = {
  about: {
    image: "/src/assets/sections/about-bg.webp",
    alt: {
      es: "Equipo de ingenieros de Segula Technologies trabajando en proyectos innovadores",
      en: "Segula Technologies engineering team working on innovative projects",
      fr: "Équipe d'ingénieurs Segula Technologies travaillant sur des projets innovants",
    },
    es: "En Segula Technologies, cada año comenzamos una historia con miles de nuevos ingenieros. Únete a nuestro equipo global de expertos y desarrolla tu carrera en un entorno de innovación y excelencia técnica.",
    en: "At Segula Technologies, every year we start a story with thousands of new engineers. Join our global team of experts and develop your career in an environment of innovation and technical excellence.",
    fr: "Chez Segula Technologies, chaque année nous commençons une histoire avec des milliers de nouveaux ingénieurs. Rejoignez notre équipe mondiale d'experts et développez votre carrière dans un environnement d'innovation et d'excellence technique.",
  },

  engineering: {
    image: "/src/assets/motor.webp",
    alt: {
      es: "Ingeniería avanzada y desarrollo tecnológico en Segula Technologies",
      en: "Advanced engineering and technological development at Segula Technologies",
      fr: "Ingénierie avancée et développement technologique chez Segula Technologies",
    },
    es: "Desarrollamos soluciones de ingeniería de vanguardia en sectores clave como automotriz, aeroespacial, energía y manufactura. Nuestros ingenieros trabajan en los proyectos más desafiantes del mundo.",
    en: "We develop cutting-edge engineering solutions in key sectors such as automotive, aerospace, energy and manufacturing. Our engineers work on the world's most challenging projects.",
    fr: "Nous développons des solutions d'ingénierie de pointe dans des secteurs clés tels que l'automobile, l'aérospatiale, l'énergie et la fabrication. Nos ingénieurs travaillent sur les projets les plus difficiles au monde.",
  },

  innovation: {
    image: "/src/assets/background.svg",
    alt: {
      es: "Innovación y tecnología del futuro en Segula Technologies",
      en: "Innovation and future technology at Segula Technologies",
      fr: "Innovation et technologie du futur chez Segula Technologies",
    },
    es: "La innovación está en el corazón de todo lo que hacemos. Desde la investigación y desarrollo hasta la implementación de nuevas tecnologías, estamos construyendo el futuro de la ingeniería.",
    en: "Innovation is at the heart of everything we do. From research and development to implementing new technologies, we are building the future of engineering.",
    fr: "L'innovation est au cœur de tout ce que nous faisons. De la recherche et développement à la mise en œuvre de nouvelles technologies, nous construisons l'avenir de l'ingénierie.",
  },

  careers: {
    image: "/src/assets/sections/about-bg.webp",
    alt: {
      es: "Oportunidades de carrera y crecimiento profesional en Segula Technologies",
      en: "Career opportunities and professional growth at Segula Technologies",
      fr: "Opportunités de carrière et croissance professionnelle chez Segula Technologies",
    },
    es: "Tu carrera en Segula Technologies te llevará a lugares que nunca imaginaste. Con presencia en 30 países y proyectos en los sectores más innovadores, las oportunidades son infinitas.",
    en: "Your career at Segula Technologies will take you places you never imagined. With presence in 30 countries and projects in the most innovative sectors, opportunities are endless.",
    fr: "Votre carrière chez Segula Technologies vous mènera à des endroits que vous n'avez jamais imaginés. Avec une présence dans 30 pays et des projets dans les secteurs les plus innovants, les opportunités sont infinies.",
  },

  home: {
    image: "/src/assets/sections/about-bg.webp",
    alt: {
      es: "Bienvenido a Segula Technologies - Líder mundial en ingeniería",
      en: "Welcome to Segula Technologies - Global engineering leader",
      fr: "Bienvenue chez Segula Technologies - Leader mondial en ingénierie",
    },
    es: "Cada año, en Segula Technologies, comenzamos una historia con miles de nuevos ingenieros. ¿Por qué no tú? Únete a nuestro equipo global y sé parte de la innovación que está transformando el mundo.",
    en: "Each year, at Segula Technologies, we start a story with thousands of new engineers. Why not you? Join our global team and be part of the innovation that is transforming the world.",
    fr: "Chaque année, chez Segula Technologies, nous commençons une histoire avec des milliers de nouveaux ingénieurs. Pourquoi pas vous ? Rejoignez notre équipe mondiale et faites partie de l'innovation qui transforme le monde.",
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
): { image: string; alt: string; text: string } | null {
  if (!isValidSection(section)) {
    section = getDefaultSection();
  }

  const data = imageSections[section];

  if (!data) return null;

  return {
    image: data.image,
    alt: data.alt[locale] || data.alt.es,
    text: data[locale] || data.es,
  };
}
