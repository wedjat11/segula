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

  const t = useTranslations(locale);

  const handleImageLoad = () => setImageLoaded(true);
  const handleImageError = () => setImageError(true);

  return (
    <section
      className={`w-full flex flex-col py-10 gap-5 md:w-10/12 mx-auto ${className}`}
    >
      <WhiteBullet
        title={t.aboutSection.bulletTitle}
        alt={t.aboutSection.bulletAlt}
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
            alt={t.aboutSection.imageAlt}
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
              <span className="font-bold block">
                {t.aboutSection.titleBold}
              </span>
              <span className="font-normal">{t.aboutSection.titleNormal}</span>
            </h2>
          </div>

          <div className="text-white text-xs md:text-base lg:text-xl flex flex-col gap-6">
            <p className="leading-relaxed">{t.aboutSection.paragraph1}</p>
            <p className="leading-relaxed">{t.aboutSection.paragraph2}</p>
          </div>
        </section>
      </div>
    </section>
  );
};

export default AboutSection;
