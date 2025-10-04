// src/components/PageWrapper.tsx
import React, { type ReactNode } from "react";

import type { Language } from "../lib/translations";
import { LanguageProvider } from "@/context/LanguageContext";

interface PageWrapperProps {
  children: ReactNode;
  initialLanguage?: Language;
  className?: string;
}

/**
 * Wrapper principal para todas las páginas que necesiten gestión de idiomas.
 * Este componente envuelve el contenido con el LanguageProvider y
 * aplica estilos base necesarios.
 */
const PageWrapper: React.FC<PageWrapperProps> = ({
  children,
  initialLanguage,
  className = "",
}) => {
  return (
    <LanguageProvider initialLanguage={initialLanguage}>
      <div
        className={`min-h-screen transition-opacity duration-300 ${className}`}
        id="page-content"
      >
        {children}
      </div>
    </LanguageProvider>
  );
};

export default PageWrapper;
