// src/contexts/LanguageContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { Language, Translations } from "../lib/translations";
import { translations, detectLanguage } from "../lib/translations";

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (language: Language) => void;
  t: Translations;
  isLoading: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
  initialLanguage,
}) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Si se pasa un idioma inicial, usarlo (útil para SSR)
    if (initialLanguage) return initialLanguage;

    // En cliente, usar la función de detección existente
    if (typeof window !== "undefined") {
      return detectLanguage();
    }

    // Fallback para SSR
    return "es";
  });

  const [isLoading, setIsLoading] = useState(true);

  // Inicializar el idioma cuando el componente se monta
  useEffect(() => {
    let languageToUse = currentLanguage;

    // Solo en cliente: verificar localStorage y detectar idioma
    if (typeof window !== "undefined") {
      try {
        // Prioridad 1: Idioma guardado en localStorage
        const savedLanguage = localStorage.getItem(
          "segula-language"
        ) as Language;

        // Prioridad 2: Idioma inicial pasado como prop
        // Prioridad 3: Detectar desde URL/navegador
        // Prioridad 4: Fallback a español
        languageToUse = savedLanguage || initialLanguage || detectLanguage();

        // Validar que el idioma sea soportado
        const supportedLanguages: Language[] = ["es", "en", "fr"];
        if (!supportedLanguages.includes(languageToUse)) {
          languageToUse = "es";
        }
      } catch (error) {
        console.warn("Error al inicializar idioma:", error);
        languageToUse = "es";
      }
    }

    setCurrentLanguage(languageToUse);
    setIsLoading(false);
  }, [initialLanguage]);

  // Actualizar localStorage y HTML lang cuando cambie el idioma
  useEffect(() => {
    if (typeof window !== "undefined" && !isLoading) {
      try {
        // Guardar en localStorage
        localStorage.setItem("segula-language", currentLanguage);

        // Actualizar atributo lang del HTML para accesibilidad
        document.documentElement.lang = currentLanguage;

        // Opcional: Actualizar meta tags dinámicamente
        const metaDescription = document.querySelector(
          'meta[name="description"]'
        );
        if (metaDescription) {
          const descriptions = {
            es: "Segula Technologies - Únete a miles de ingenieros",
            en: "Segula Technologies - Join thousands of engineers",
            fr: "Segula Technologies - Rejoignez des milliers d'ingénieurs",
          };
          metaDescription.setAttribute(
            "content",
            descriptions[currentLanguage]
          );
        }
      } catch (error) {
        console.warn("Error al actualizar configuración de idioma:", error);
      }
    }
  }, [currentLanguage, isLoading]);

  const setLanguage = (language: Language) => {
    // Validar idioma antes de establecerlo
    const supportedLanguages: Language[] = ["es", "en", "fr"];
    if (!supportedLanguages.includes(language)) {
      console.warn(`Idioma no soportado: ${language}`);
      return;
    }

    setCurrentLanguage(language);

    // Opcional: Actualizar URL para SEO y navegación
    if (typeof window !== "undefined") {
      try {
        const currentPath = window.location.pathname;

        // Remover idioma actual de la URL
        const pathWithoutLang = currentPath.replace(/^\/(es|en|fr)/, "");

        // Construir nueva URL
        const newPath =
          language === "es"
            ? pathWithoutLang || "/"
            : `/${language}${pathWithoutLang || ""}`;

        // Solo actualizar si la URL es diferente
        if (window.location.pathname !== newPath) {
          // Usar pushState para cambiar URL sin recargar
          window.history.pushState({}, "", newPath);

          // Opcional: Trigger un evento personalizado para que Astro pueda reaccionar
          window.dispatchEvent(
            new CustomEvent("languageChanged", {
              detail: { language, newPath },
            })
          );
        }
      } catch (error) {
        console.warn("Error al actualizar URL:", error);
      }
    }
  };

  const contextValue: LanguageContextType = {
    currentLanguage,
    setLanguage,
    t: translations[currentLanguage],
    isLoading,
  };

  return (
    <LanguageContext.Provider value={contextValue}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook principal para usar el contexto
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);

  if (context === undefined) {
    throw new Error(
      "useLanguage debe ser usado dentro de un LanguageProvider. " +
        "Asegúrate de envolver tu componente con <LanguageProvider>."
    );
  }

  return context;
};

// Hook específico para traducciones (compatible con tu hook existente)
export const useTranslations = (): Translations => {
  const { t } = useLanguage();
  return t;
};

// Hook para obtener solo el idioma actual
export const useCurrentLanguage = (): Language => {
  const { currentLanguage } = useLanguage();
  return currentLanguage;
};

// Hook para cambiar idioma
export const useSetLanguage = () => {
  const { setLanguage } = useLanguage();
  return setLanguage;
};
