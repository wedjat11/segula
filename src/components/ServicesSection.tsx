import { useScreen } from "@/hooks/useScreen";
import { useState } from "react";
import WhiteBullet from "./WhiteBullet";
import ServiceCard from "./ServiceCard";
import { Car } from "lucide-react";

// Tipo para Service (exportar desde un archivo types.ts si prefieres)
export interface Service {
  id: string;
  title: string;
  icon?: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
  bulletColor?: string;
  borderColor?: string;
}

const servicesData: Service[] = [
  {
    id: "automotive",
    title: "AUTOMOTIVE",
    icon: "/src/assets/icons/car-icon.svg",
    description:
      "Product engineering with a complete assessment of the whole project from conceptualization to the final design.",
    features: [
      "Process Engineering: Experience in a complete definition of chassis assembly including machining mechanics, plastic injection, etc.",
      "CAE/CFD Simulations.",
    ],
    imageSrc: "/src/assets/motor.webp",
    imageAlt: "Automotive engineering",
    bulletColor: "bg-blue-500",
    borderColor: "border-gray-600",
  },
  {
    id: "energy",
    title: "ENERGY",
    icon: "/src/assets/icons/energy-icon.svg",
    description:
      "Experience in plant engineering design, construction and launching for wind, solar, and co-generation energy.",
    features: [],
    imageSrc: "/src/assets/sections/about-bg.webp",
    imageAlt: "Renewable energy infrastructure",
    bulletColor: "bg-green-500",
    borderColor: "border-blue-600",
  },
];

// Componente principal ServicesSection
const ServicesSection: React.FC<{ lang?: "es" | "en" | "fr" }> = ({
  lang = "es",
}) => {
  // Desktop: siempre hay un servicio activo (automotive por defecto)
  const [activeService, setActiveService] = useState<string>("automotive");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const isDesktop = useScreen("(min-width: 1024px)");

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

  // Textos según idioma
  const texts = {
    es: {
      title: "Nuestros Servicios",
      subtitle: "Soluciones de ingeniería especializadas para industrias clave",
    },
    en: {
      title: "Our Services",
      subtitle: "Specialized engineering solutions for key industries",
    },
    fr: {
      title: "Nos Services",
      subtitle: "Solutions d'ingénierie spécialisées pour les industries clés",
    },
  };

  const currentTexts = texts[lang];

  return (
    <section className="relative min-h-screen py-12 lg:py-20">
      <div className="container mx-auto px-4">
        {/* Header de la sección */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            {currentTexts.title}
          </h2>
          <p className="text-gray-400 text-base lg:text-lg max-w-2xl mx-auto">
            {currentTexts.subtitle}
          </p>
        </div>

        {/* Bullets de navegación */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 lg:mb-12">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => handleDesktopHover(service.id)}
              onMouseLeave={() => handleDesktopHover(null)}
            >
              <WhiteBullet
                icon={service.icon}
                title={service.title}
                lang={lang}
                isActive={activeService === service.id}
                isInactive={isDesktop && activeService !== service.id}
                onClick={
                  !isDesktop ? () => handleMobileClick(service.id) : undefined
                }
                bulletColor={service.bulletColor}
                className={!isDesktop ? "w-full" : ""}
              />
            </div>
          ))}
        </div>

        {/* Contenedor de Cards */}
        {isDesktop ? (
          // Desktop: Ambas cards siempre visibles
          <div className="grid grid-cols-2 gap-8 max-w-6xl mx-auto">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                isActive={activeService === service.id}
                variant="desktop"
              />
            ))}
          </div>
        ) : (
          // Mobile: Una card a la vez
          <div className="max-w-lg mx-auto">
            {servicesData.map(
              (service) =>
                activeService === service.id && (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    isActive={true}
                    variant="mobile"
                    onClose={() => setActiveService("")}
                  />
                )
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
