import { useState } from "react";
import type { Language } from "../lib/translations";
import { useTranslations } from "../lib/i18n-utils";

interface Props {
  locale: Language;
}

type ServiceType = "automotive" | "industrialVehicles" | "aerospace";

export default function EngineeringSection({ locale }: Props) {
  const t = useTranslations(locale);
  const [activeService, setActiveService] = useState<ServiceType>("automotive");

  const services: { id: ServiceType; icon: string }[] = [
    { id: "automotive", icon: "🚗" },
    { id: "industrialVehicles", icon: "🚛" },
    { id: "aerospace", icon: "✈️" },
  ];

  return (
    <section className="w-full py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Bullets de navegación */}
        <div className="flex justify-center gap-8 mb-12">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setActiveService(service.id)}
              className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
                activeService === service.id
                  ? "bg-blue-600 text-white shadow-lg scale-110"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
              aria-label={t.engineeringServices[service.id].title}
            >
              <span className="text-2xl">{service.icon}</span>
              <span className="font-semibold uppercase text-sm hidden md:inline">
                {t.engineeringServices[service.id].title}
              </span>
            </button>
          ))}
        </div>

        {/* Cards de servicios */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service) => {
            const isActive = activeService === service.id;
            const serviceData = t.engineeringServices[service.id];

            return (
              <div
                key={service.id}
                className={`rounded-lg p-8 transition-all duration-500 ${
                  isActive
                    ? "bg-white text-gray-900 shadow-2xl scale-105"
                    : "bg-gray-900 text-white opacity-50"
                }`}
              >
                {/* Ícono */}
                <div className="text-6xl mb-6 text-center">
                  {service.icon}
                </div>

                {/* Título */}
                <h3
                  className={`text-xl font-bold mb-4 text-center ${
                    isActive ? "text-blue-600" : "text-white"
                  }`}
                >
                  {serviceData.title}
                </h3>

                {/* Descripción */}
                <p
                  className={`text-sm leading-relaxed ${
                    isActive ? "text-gray-700" : "text-gray-400"
                  }`}
                >
                  {serviceData.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
