// src/components/form/HeroSection.tsx
import React from "react";
import { useTranslations } from "../../lib/i18n-utils";
import type { Language } from "../../lib/translations";

interface HeroSectionProps {
  locale: Language;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  locale,
  className = "",
}) => {
  const t = useTranslations(locale);

  // URLs de redes sociales
  const socialLinks = {
    linkedin: "https://www.linkedin.com/company/segula-technologies",
    facebook: "https://www.facebook.com/SegulaGroup",
    twitter: "https://twitter.com/SegulaGroup",
    instagram: "https://www.instagram.com/segula_technologies",
  };

  return (
    <div
      className={`text-white space-y-6 lg:space-y-8 text-center lg:text-left ${className}`}
    >
      <h1
        id="form-title"
        className="text-4xl lg:text-5xl xl:text-7xl font-bold leading-tight"
      >
        <span className="block text-white/90 text-xl lg:text-2xl font-normal mb-4 lg:mb-6">
          {t.mainTitle.eachYear}
        </span>
        <span className="block text-white">{t.mainTitle.atSegula}</span>
        <span className="block text-white">{t.mainTitle.weStartStory}</span>
        <span className="block text-white">{t.mainTitle.thousandsNew}</span>
        <span className="block text-white">{t.mainTitle.engineers}</span>
        <span className="block mt-6 lg:mt-8 text-3xl lg:text-4xl xl:text-5xl text-white">
          {t.mainTitle.whyNotYou}
        </span>
      </h1>

      {/* Redes sociales */}
      <div
        className="flex justify-center lg:justify-start pt-8 lg:pt-10"
        aria-label={t.aria.socialMedia}
      >
        <div className="w-full backdrop-blur-md bg-white/95 border border-white/30 rounded-full p-4 lg:p-5 flex justify-evenly space-x-6 lg:space-x-8 shadow-lg">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/70 transition-all duration-300"
            aria-label={t.aria.linkedin}
          >
            <svg
              className="w-7 h-7 lg:w-8 lg:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a
            href={socialLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/70 transition-all duration-300"
            aria-label={t.aria.facebook}
          >
            <svg
              className="w-7 h-7 lg:w-8 lg:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>
          <a
            href={socialLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/70 transition-all duration-300"
            aria-label={t.aria.twitter}
          >
            <svg
              className="w-7 h-7 lg:w-8 lg:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
            </svg>
          </a>
          <a
            href={socialLinks.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary/70 transition-all duration-300"
            aria-label={t.aria.instagram}
          >
            <svg
              className="w-7 h-7 lg:w-8 lg:h-8"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
