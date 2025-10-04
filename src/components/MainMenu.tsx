import React from "react";
import { PopoverArrow } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { Language } from "../lib/translations";
import { useTranslations, getLocalizedUrl } from "../lib/i18n-utils";

interface Props {
  locale: Language;
  className?: string;
  ismobile?: boolean;
}

// Enlaces del menú (rutas base sin idioma)
const menuLinks = [
  { nameKey: "aboutUs", url: "/" },
  { nameKey: "engineeringServices", url: "/engineering-services" },
  { nameKey: "analysisSimulation", url: "/analysis-simulation" },
  { nameKey: "news", url: "/news" },
  { nameKey: "innovation", url: "/innovation" },
] as const;

interface MobileMenuProps {
  locale: Language;
}

function MobileMenu({ locale }: MobileMenuProps) {
  const t = useTranslations(locale);

  return (
    <div className="w-full bg-primary text-white rounded-full">
      <div className="container mx-auto px-4 py-3 text-white">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="text-white px-6 py-3 rounded-md flex items-center w-full font-semibold justify-between hover:bg-white/10 transition-colors"
              aria-label={`${t.menu.menu} - ${t.menu.aboutUs}`}
            >
              <span>{t.menu.aboutUs}</span>
              <svg
                className="w-4 h-4 ml-2 transition-transform group-data-[state=open]:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
          </PopoverTrigger>

          <PopoverContent className="w-screen bg-primary text-white mx-auto mt-2 p-0 border-0 px-4">
            <nav
              className="rounded-lg overflow-hidden"
              role="navigation"
              aria-label={`${t.menu.menu} principal`}
            >
              {menuLinks.map((link, index) => (
                <a
                  key={index}
                  href={getLocalizedUrl(locale, link.url)}
                  className="block px-6 py-4 hover:bg-white/10 transition-colors focus:bg-white/20 focus:outline-none"
                  role="menuitem"
                >
                  {t.menu[link.nameKey].toUpperCase()}
                </a>
              ))}
            </nav>
            <PopoverArrow className="fill-primary" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}

interface DesktopMenuProps {
  locale: Language;
}

function DesktopMenu({ locale }: DesktopMenuProps) {
  const t = useTranslations(locale);

  return (
    <div className="w-full bg-primary text-white">
      <div className="container mx-auto px-4 py-4">
        <nav
          className="flex justify-center"
          role="navigation"
          aria-label={`${t.menu.menu} principal`}
        >
          <div className="flex gap-8 flex-wrap justify-center">
            {menuLinks.map((link, index) => (
              <a
                key={index}
                href={getLocalizedUrl(locale, link.url)}
                className="px-6 py-3 rounded-md hover:bg-white/10 hover:text-white transition-all duration-300 font-medium text-center whitespace-nowrap focus:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/30"
                role="menuitem"
              >
                {t.menu[link.nameKey].toUpperCase()}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}

const MainMenu: React.FC<Props> = ({ locale, className = "", ismobile }) => {
  return (
    <div className={className}>
      {/* Mobile Menu - visible only on mobile */}
      <div className="block md:hidden px-4">
        <MobileMenu locale={locale} />
      </div>

      {/* Desktop Menu - visible only on desktop */}
      <div className="hidden md:block">
        <DesktopMenu locale={locale} />
      </div>
    </div>
  );
};

export default MainMenu;
