import React, { useState } from "react";
import { useScreen } from "@/hooks/useScreen";
import WhiteBullet from "./WhiteBullet";
import ServiceCard from "./ServiceCard";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";
import automovilImg from "../assets/automovil.png";
import engineeringImg from "../assets/engineering.jpg";

// Tipo para Service
export interface EngineeringService {
  id: "automotive" | "industrialVehicles" | "aerospace";
  icon?: string;
  imageSrc: string;
  bulletColor?: string;
  borderColor?: string;
}

// Datos de servicios
const engineeringServicesData: EngineeringService[] = [
  {
    id: "automotive",
    imageSrc: automovilImg.src,
    bulletColor: "bg-white",
    borderColor: "border-gray-600",
  },
  {
    id: "industrialVehicles",
    imageSrc: engineeringImg.src,
    bulletColor: "bg-white",
    borderColor: "border-blue-600",
  },
  {
    id: "aerospace",
    imageSrc: engineeringImg.src,
    bulletColor: "bg-white",
    borderColor: "border-purple-600",
  },
];

interface Props {
  locale: Language;
  className?: string;
}

const EngineeringServicesSection: React.FC<Props> = ({
  locale,
  className = "",
}) => {
  const [activeService, setActiveService] = useState<string>("automotive");
  const [hoveredService, setHoveredService] = useState<string | null>(null);
  const isDesktop = useScreen("(min-width: 1024px)");
  const t = useTranslations(locale);

  const handleMobileClick = (serviceId: string) => {
    setActiveService((prev) => (prev === serviceId ? "" : serviceId));
  };

  const handleDesktopHover = (serviceId: string | null) => {
    if (isDesktop && serviceId) {
      setActiveService(serviceId);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop && hoveredService) {
      setHoveredService(null);
    }
  };

  return (
    <section
      className={`py-12 lg:py-20 w-11/12 mx-auto ${className}`}
      aria-labelledby="engineering-services-title"
    >
      <div className="w-11/12 mx-auto px-4">
        {/* Bullets de servicios - Tres en fila */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8 lg:mb-12">
          {engineeringServicesData.map((service) => (
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
                title={t.engineeringServices[service.id].title}
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

        {/* Contenedor de Cards - Grid: 2 arriba, 1 abajo centrada */}
        {isDesktop ? (
          <div className="max-w-7xl mx-auto">
            {/* Primera fila: 2 cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-10">
              {engineeringServicesData.slice(0, 2).map((service) => (
                <ServiceCard
                  key={service.id}
                  service={{
                    ...service,
                    title: t.engineeringServices[service.id].title,
                    description: t.engineeringServices[service.id].description,
                    features: [],
                    imageAlt: t.engineeringServices[service.id].title,
                  }}
                  locale={locale}
                  isActive={activeService === service.id}
                  isHovered={hoveredService === service.id}
                  variant="desktop"
                />
              ))}
            </div>
            {/* Segunda fila: 1 card centrada */}
            <div className="flex justify-center">
              <div className="w-full md:w-1/2">
                {engineeringServicesData.slice(2, 3).map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={{
                      ...service,
                      title: t.engineeringServices[service.id].title,
                      description:
                        t.engineeringServices[service.id].description,
                      features: [],
                      imageAlt: t.engineeringServices[service.id].title,
                    }}
                    locale={locale}
                    isActive={activeService === service.id}
                    isHovered={hoveredService === service.id}
                    variant="desktop"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Mobile: Una card a la vez
          <div className="max-w-lg mx-auto">
            {activeService ? (
              engineeringServicesData
                .filter((service) => service.id === activeService)
                .map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={{
                      ...service,
                      title: t.engineeringServices[service.id].title,
                      description:
                        t.engineeringServices[service.id].description,
                      features: [],
                      imageAlt: t.engineeringServices[service.id].title,
                    }}
                    locale={locale}
                    isActive={true}
                    variant="mobile"
                    onClose={() => setActiveService("")}
                  />
                ))
            ) : (
              <div className="text-center py-12">
                <p className="text-white/60 text-lg">
                  {t.servicesSection.noServiceSelected}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default EngineeringServicesSection;
