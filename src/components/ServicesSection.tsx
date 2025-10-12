import React, { useState } from "react";
import { useScreen } from "@/hooks/useScreen";
import WhiteBullet from "./WhiteBullet";
import ServiceCard from "./ServiceCard";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";
import automovilImg from "../assets/automovil.png";
import energyImg from "../assets/energy.png";

// Tipo para Service simplificado
export interface Service {
  id: "automotive" | "energy" | "aerospace";
  icon?: string;
  imageSrc: string;
  bulletColor?: string;
  borderColor?: string;
}

// Datos de servicios (solo datos que no son traducibles)
const servicesData: Service[] = [
  {
    id: "automotive",
    imageSrc: automovilImg.src,
    bulletColor: "bg-blue-500",
    borderColor: "border-gray-600",
  },
  {
    id: "energy",
    imageSrc: energyImg.src,
    bulletColor: "bg-green-500",
    borderColor: "border-blue-600",
  },
];

interface Props {
  locale: Language;
  className?: string;
}

const ServicesSection: React.FC<Props> = ({ locale, className = "" }) => {
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
      className={`relative min-h-screen py-12 lg:py-20 w-11/12 mx-auto ${className}`}
      aria-labelledby="services-title"
    >
      <div className="w-11/12 mx-auto px-4">
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
                title={t.servicesSection.services[service.id].title}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
            {servicesData.map((service) => (
              <ServiceCard
                key={service.id}
                service={{
                  ...service,
                  title: t.servicesSection.services[service.id].title,
                  description:
                    t.servicesSection.services[service.id].description,
                  features: t.servicesSection.services[service.id].features,
                  imageAlt: t.servicesSection.services[service.id].imageAlt,
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
                      title: t.servicesSection.services[service.id].title,
                      description:
                        t.servicesSection.services[service.id].description,
                      features: t.servicesSection.services[service.id].features,
                      imageAlt: t.servicesSection.services[service.id].imageAlt,
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

export default ServicesSection;
