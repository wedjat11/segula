import React, { useState } from "react";
import WhiteBullet from "./WhiteBullet";
import motorImage from "../assets/motor.webp";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";

interface Props {
  locale: Language;
  className?: string;
}

const AboutSection: React.FC<Props> = ({ locale, className = "" }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Usar traducciones del sistema principal si las tienes
  const t = useTranslations(locale);

  // Traducciones específicas para esta sección (puedes moverlas a translations.ts)
  const aboutTexts = {
    es: {
      bulletTitle: "NOSOTROS",
      bulletAlt: "acerca de nosotros",
      titleBold: "SOMOS EL CORAZÓN",
      titleNormal: "DE LAS INNOVACIONES",
      paragraph1:
        "Proporcionamos soluciones innovadoras combinando con precisión la excelencia en el diseño con un compromiso hacia un servicio al cliente excepcional.",
      paragraph2:
        "Lo que es particularmente notable en todos los proyectos considerados para nuestro éxito es la forma en que la investigación e innovación se impulsa a través de la colaboración. Nuestro equipo reúne un amplio conjunto de habilidades y experiencias: vinculan la innovación fundamental con la práctica de ingeniería.",
      imageAlt: "Motor de ingeniería de Segula Technologies",
      learnMore: "Conoce más",
    },
    en: {
      bulletTitle: "ABOUT US",
      bulletAlt: "about us",
      titleBold: "WE ARE THE HEART",
      titleNormal: "OF INNOVATIONS",
      paragraph1:
        "We provide innovative solutions by precisely blending excellence in design with a commitment to exceptional customer service.",
      paragraph2:
        "What is particularly striking across all the projects considered for our success is the way in which research and innovation is driven by collaboration. Our team brings together a broad set of skills and experiences: they link foundational innovation with engineering practice.",
      imageAlt: "Segula Technologies engineering motor",
      learnMore: "Learn more",
    },
    fr: {
      bulletTitle: "À PROPOS",
      bulletAlt: "à propos de nous",
      titleBold: "NOUS SOMMES LE CŒUR",
      titleNormal: "DES INNOVATIONS",
      paragraph1:
        "Nous fournissons des solutions innovantes en combinant avec précision l'excellence en conception avec un engagement envers un service client exceptionnel.",
      paragraph2:
        "Ce qui est particulièrement frappant dans tous les projets considérés pour notre succès, c'est la façon dont la recherche et l'innovation sont motivées par la collaboration. Notre équipe rassemble un large éventail de compétences et d'expériences : elle relie l'innovation fondamentale à la pratique de l'ingénierie.",
      imageAlt: "Moteur d'ingénierie Segula Technologies",
      learnMore: "En savoir plus",
    },
  };

  const aboutT = aboutTexts[locale];

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <section
      className={`w-full flex flex-col py-10 gap-5 md:w-10/12 mx-auto ${className}`}
    >
      <WhiteBullet
        title={aboutT.bulletTitle}
        alt={aboutT.bulletAlt}
        locale={locale}
      />

      <div className="w-full flex flex-col md:flex-row gap-14">
        <div className="w-full md:w-1/2 md:h-[370px] relative overflow-hidden rounded-lg">
          {!imageLoaded && !imageError && (
            <div className="absolute inset-0 bg-gray-800 flex items-center justify-center">
              <div className="loading-spinner"></div>
            </div>
          )}

          <img
            src={motorImage.src}
            alt={aboutT.imageAlt}
            className={`w-full h-full object-cover transition-opacity duration-500 ${
              imageLoaded && !imageError ? "opacity-100" : "opacity-0"
            }`}
            onLoad={handleImageLoad}
            onError={handleImageError}
            loading="lazy"
          />
        </div>

        <section className="flex flex-col gap-5 w-full md:w-1/2" id="about">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-4xl text-white uppercase leading-tight">
              <span className="font-bold block">{aboutT.titleBold}</span>
              <span className="font-normal">{aboutT.titleNormal}</span>
            </h2>
          </div>

          <div className="text-white text-xs md:text-base lg:text-xl flex flex-col gap-6">
            <p className="leading-relaxed">{aboutT.paragraph1}</p>
            <p className="leading-relaxed">{aboutT.paragraph2}</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutSection;
