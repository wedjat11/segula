import React from "react";
import { PopoverArrow } from "@radix-ui/react-popover";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { Language } from "../lib/translations";
import { useTranslations, getLocalizedUrl, getCleanPath } from "../lib/i18n-utils";

interface Props {
  locale: Language;
  className?: string;
  ismobile?: boolean;
  currentPath?: string;
}

// Enlaces del menú (rutas base sin idioma)
const menuLinks = [
  { nameKey: "aboutUs", url: "/", external: false },
  { nameKey: "engineeringServices", url: "/engineering-services", external: false },
  { nameKey: "analysisSimulation", url: "/analysis-simulation", external: false },
  { nameKey: "news", url: "https://www.segulatechnologies.com/en/latest-news/", external: true },
  { nameKey: "innovation", url: "https://www.segulatechnologies.com/en/innovation/", external: true },
] as const;

interface MobileMenuProps {
  locale: Language;
  currentPath: string;
}

function MobileMenu({ locale, currentPath }: MobileMenuProps) {
  const t = useTranslations(locale);
  
  // Encontrar la página actual
  const cleanPath = getCleanPath(currentPath);
  
  // Función helper para normalizar rutas (quitar slash final)
  const normalizePath = (path: string) => {
    if (path === "/") return path;
    return path.endsWith("/") ? path.slice(0, -1) : path;
  };

  const normalizedCurrent = normalizePath(cleanPath);

  const activeLink = menuLinks.find(link => {
    if (link.external) return false;
    const normalizedLink = normalizePath(link.url);
    return normalizedCurrent === normalizedLink;
  }) || menuLinks[0]; // Fallback a Home/About Us

  return (
    <div className="w-full backdrop-blur-md bg-primary/40 border border-primary/50 rounded-full shadow-lg">
      <div className="container mx-auto px-4 py-3 text-white">
        <Popover>
          <PopoverTrigger asChild>
            <button
              className="text-white px-6 py-3 rounded-md flex items-center w-full font-semibold justify-between hover:bg-black/30 transition-all duration-300"
              aria-label={`${t.menu.menu} - ${t.menu[activeLink.nameKey]}`}
            >
              <span>{t.menu[activeLink.nameKey].toUpperCase()}</span>
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

          <PopoverContent className="w-screen backdrop-blur-md bg-primary/40 border border-primary/50 text-white mx-auto mt-2 p-0 px-4">
            <nav
              className="rounded-lg overflow-hidden"
              role="navigation"
              aria-label={`${t.menu.menu} principal`}
            >
              {menuLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.external ? link.url : getLocalizedUrl(locale, link.url)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="block px-6 py-4 hover:bg-black/30 transition-all duration-300 focus:bg-black/40 focus:outline-none"
                  role="menuitem"
                >
                  {t.menu[link.nameKey].toUpperCase()}
                </a>
              ))}
            </nav>
            <PopoverArrow className="fill-primary/40" />
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
    <div className="w-full backdrop-blur-md bg-primary/70 border border-primary/80 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <nav
          className="flex justify-center"
          role="navigation"
          aria-label={`${t.menu.menu} principal`}
        >
          <div className="flex gap-2 flex-wrap justify-center">
            {menuLinks.map((link, index) => (
              <a
                key={index}
                href={link.external ? link.url : getLocalizedUrl(locale, link.url)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className="px-6 py-3 rounded-full text-white hover:bg-primary hover:shadow-lg transition-all duration-300 font-medium text-center whitespace-nowrap focus:bg-black/40 focus:outline-none focus:ring-2 focus:ring-white/30 border border-transparent hover:border-white/20"
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

const MainMenu: React.FC<Props> = ({ locale, className = "", ismobile, currentPath = "/" }) => {
  return (
    <div className={className}>
      {/* Mobile Menu - visible only on mobile */}
      <div className="block md:hidden px-4">
        <MobileMenu locale={locale} currentPath={currentPath} />
      </div>

      {/* Desktop Menu - visible only on desktop */}
      <div className="hidden md:block">
        <DesktopMenu locale={locale} />
      </div>
    </div>
  );
};

export default MainMenu;
