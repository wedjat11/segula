import React, { useState } from "react";
import { useScreen } from "@/hooks/useScreen";
import WhiteBullet from "./WhiteBullet";
import ServiceCard from "./ServiceCard";
import type { Language } from "../lib/translations";

// Tipo para Service con soporte multiidioma
export interface Service {
  id: string;
  title: Record<Language, string>;
  icon?: string;
  description: Record<Language, string>;
  features: Record<Language, string[]>;
  imageSrc: string;
  imageAlt: Record<Language, string>;
  bulletColor?: string;
  borderColor?: string;
}

// Datos de servicios con traducciones completas
const servicesData: Service[] = [
  {
    id: "automotive",
    title: {
      es: "AUTOMOTRIZ",
      en: "AUTOMOTIVE",
      fr: "AUTOMOBILE",
    },
    icon: "/src/assets/sections/about-bg.webp",
    description: {
      es: "Ingeniería de productos con una evaluación completa de todo el proyecto desde la conceptualización hasta el diseño final.",
      en: "Product engineering with a complete assessment of the whole project from conceptualization to the final design.",
      fr: "Ingénierie de produits avec une évaluation complète de l'ensemble du projet depuis la conceptualisation jusqu'à la conception finale.",
    },
    features: {
      es: [
        "Ingeniería de Procesos: Experiencia en la definición completa del ensamblaje de chasis incluyendo mecánica de mecanizado, inyección de plástico, etc.",
        "Simulaciones CAE/CFD.",
      ],
      en: [
        "Process Engineering: Experience in a complete definition of chassis assembly including machining mechanics, plastic injection, etc.",
        "CAE/CFD Simulations.",
      ],
      fr: [
        "Ingénierie des Processus: Expérience dans la définition complète de l'assemblage de châssis incluant la mécanique d'usinage, l'injection plastique, etc.",
        "Simulations CAE/CFD.",
      ],
    },
    imageSrc: "/src/assets/motor.webp",
    imageAlt: {
      es: "Ingeniería automotriz",
      en: "Automotive engineering",
      fr: "Ingénierie automobile",
    },
    bulletColor: "bg-blue-500",
    borderColor: "border-gray-600",
  },
  {
    id: "energy",
    title: {
      es: "ENERGÍA",
      en: "ENERGY",
      fr: "ÉNERGIE",
    },
    icon: "/src/assets/icons/energy-icon.svg",
    description: {
      es: "Experiencia en diseño, construcción e implementación de plantas de energía eólica, solar y cogeneración.",
      en: "Experience in plant engineering design, construction and launching for wind, solar, and co-generation energy.",
      fr: "Expérience en conception, construction et lancement d'installations d'ingénierie pour l'énergie éolienne, solaire et de cogénération.",
    },
    features: {
      es: [
        "Diseño de plantas de energía renovable",
        "Gestión de proyectos energéticos",
        "Optimización de sistemas de energía",
      ],
      en: [
        "Renewable energy plant design",
        "Energy project management",
        "Energy systems optimization",
      ],
      fr: [
        "Conception d'installations d'énergie renouvelable",
        "Gestion de projets énergétiques",
        "Optimisation des systèmes énergétiques",
      ],
    },
    imageSrc: "/src/assets/sections/about-bg.webp",
    imageAlt: {
      es: "Infraestructura de energía renovable",
      en: "Renewable energy infrastructure",
      fr: "Infrastructure d'énergie renouvelable",
    },
    bulletColor: "bg-green-500",
    borderColor: "border-blue-600",
  },
  {
    id: "aerospace",
    title: {
      es: "AEROESPACIAL",
      en: "AEROSPACE",
      fr: "AÉROSPATIALE",
    },
    icon: "/src/assets/icons/aerospace-icon.svg",
    description: {
      es: "Soluciones avanzadas de ingeniería para la industria aeroespacial, desde sistemas de propulsión hasta estructuras aeronáuticas.",
      en: "Advanced engineering solutions for the aerospace industry, from propulsion systems to aeronautical structures.",
      fr: "Solutions d'ingénierie avancées pour l'industrie aérospatiale, des systèmes de propulsion aux structures aéronautiques.",
    },
    features: {
      es: [
        "Diseño de sistemas aeronáuticos",
        "Análisis estructural avanzado",
        "Certificación aeroespacial",
      ],
      en: [
        "Aeronautical systems design",
        "Advanced structural analysis",
        "Aerospace certification",
      ],
      fr: [
        "Conception de systèmes aéronautiques",
        "Analyse structurelle avancée",
        "Certification aérospatiale",
      ],
    },
    imageSrc: "/src/assets/sections/about-bg.webp",
    imageAlt: {
      es: "Ingeniería aeroespacial",
      en: "Aerospace engineering",
      fr: "Ingénierie aérospatiale",
    },
    bulletColor: "bg-purple-500",
    borderColor: "border-purple-600",
  },
];

// Traducciones para la sección
const sectionTranslations = {
  es: {
    bulletTitle: "SERVICIOS",
    bulletAlt: "nuestros servicios",
    title: "Nuestros Servicios",
    subtitle: "Soluciones de ingeniería especializadas para industrias clave",
    noServiceSelected: "Selecciona un servicio para ver más detalles",
  },
  en: {
    bulletTitle: "SERVICES",
    bulletAlt: "our services",
    title: "Our Services",
    subtitle: "Specialized engineering solutions for key industries",
    noServiceSelected: "Select a service to see more details",
  },
  fr: {
    bulletTitle: "SERVICES",
    bulletAlt: "nos services",
    title: "Nos Services",
    subtitle: "Solutions d'ingénierie spécialisées pour les industries clés",
    noServiceSelected: "Sélectionnez un service pour voir plus de détails",
  },
};

interface Props {
  locale: Language;
  className?: string;
}

const ServicesSection: React.FC<Props> = ({ locale, className = "" }) => {
  // Desktop: siempre hay un servicio activo (automotive por defecto)
  const [activeService, setActiveService] = useState<string>("automotive");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const isDesktop = useScreen("(min-width: 1024px)");

  const t = sectionTranslations[locale];

  // Para mobile: toggle (puede ser null)
  const handleMobileClick = (serviceId: string) => {
    setActiveService((prev) => (prev === serviceId ? "" : serviceId));
  };

  // Para desktop: hover effect
  const handleDesktopHover = (serviceId: string | null) => {
    if (isDesktop && serviceId) {
      setActiveService(serviceId);
    }
  };

  // Reset hover when leaving the service area
  const handleMouseLeave = () => {
    if (isDesktop && hoveredService) {
      setHoveredService(null);
      // Opcional: volver al servicio por defecto
      // setActiveService("automotive");
    }
  };

  return (
    <section
      className={`relative min-h-screen py-12 lg:py-20 w-11/12 mx-auto ${className}`}
      aria-labelledby="services-title"
    >
      <div className="w-11/12 mx-auto px-4">
        {/* Título de la sección */}
        <div className="text-center mb-8 lg:mb-12">
          <WhiteBullet
            title={t.bulletTitle}
            alt={t.bulletAlt}
            locale={locale}
            className="justify-center mb-6"
          />
          <h2
            id="services-title"
            className="text-3xl md:text-4xl lg:text-5xl text-white font-bold mb-4"
          >
            {t.title}
          </h2>
          <p className="text-white/80 text-lg md:text-xl max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Bullets de servicios */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 lg:mb-12">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => {
                setHoveredService(service.id);
                handleDesktopHover(service.id);
              }}
              onMouseLeave={handleMouseLeave}
              className="transition-transform duration-300 hover:scale-105"
            >
              <WhiteBullet
                title={service.title[locale]}
                locale={locale}
                isActive={activeService === service.id}
                isInactive={isDesktop && activeService !== service.id}
                onClick={
                  !isDesktop ? () => handleMobileClick(service.id) : undefined
                }
                bulletColor={service.bulletColor}
                className={`${!isDesktop ? "w-full" : ""} cursor-pointer`}
              />
            </div>
          ))}
        </div>

        {/* Contenedor de Cards */}
        {isDesktop ? (
          // Desktop: Todas las cards siempre visibles
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={{
                  ...service,
                  title: service.title[locale],
                  description: service.description[locale],
                  features: service.features[locale],
                  imageAlt: service.imageAlt[locale],
                }}
                locale={locale}
                isActive={activeService === service.id}
                isHovered={hoveredService === service.id}
                variant="desktop"
              />
            ))}
          </div>
        ) : (
          // Mobile: Una card a la vez o mensaje si no hay selección
          <div className="max-w-lg mx-auto">
            {activeService ? (
              servicesData
                .filter((service) => service.id === activeService)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={{
                      ...service,
                      title: service.title[locale],
                      description: service.description[locale],
                      features: service.features[locale],
                      imageAlt: service.imageAlt[locale],
                    }}
                    locale={locale}
                    isActive={true}
                    variant="mobile"
                    onClose={() => setActiveService("")}
                  />
                ))
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">{t.noServiceSelected}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
