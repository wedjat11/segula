import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Importa el tipo desde el archivo principal o crea un archivo types.ts
interface Service {
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

interface ServiceCardProps {
  service: Service;
  isActive?: boolean;
  variant?: "desktop" | "mobile";
  onClose?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  isActive = false,
  variant = "desktop",
  onClose,
}) => {
  // Renderizado para Desktop - Siempre visible
  if (variant === "desktop") {
    return (
      <div
        className={`
        relative rounded-3xl overflow-hidden transition-all duration-500 transform
        ${isActive ? "bg-white scale-105 z-20" : " scale-95 opacity-80 z-10"}
       
      `}
      >
        {/* Imagen de fondo */}
        <div className="relative h-[280px] overflow-hidden">
          <img
            src={service.imageSrc}
            alt={service.imageAlt}
            className={`w-full h-full object-cover transition-all duration-500
              ${isActive ? "scale-105" : "scale-100 opacity-70"}`}
          />
          {/* Overlay gradient */}
        </div>

        {/* Contenido de texto */}
        <div
          className={`p-8 transition-colors duration-500
          ${
            isActive ? "bg-white text-gray-900" : "bg-gray-800/80 text-gray-300"
          }`}
        >
          <h3
            className={`text-2xl font-bold mb-4 transition-colors duration-500
            ${isActive ? "text-gray-900" : "text-white"}`}
          >
            {service.title}
          </h3>
          <p
            className={`mb-4 transition-colors duration-500 text-sm leading-relaxed
            ${isActive ? "text-gray-700" : "text-gray-400"}`}
          >
            {service.description}
          </p>

          {service.features.length > 0 && (
            <ul className="space-y-2">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 transition-colors duration-500
                    ${isActive ? "bg-gray-700" : "bg-gray-500"}`}
                  />
                  <span
                    className={`text-sm transition-colors duration-500
                    ${isActive ? "text-gray-600" : "text-gray-500"}`}
                  >
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // Renderizado para Mobile
  return (
    <Card className="relative rounded-2xl overflow-hidden bg-white shadow-xl border-2 border-white animate-in slide-in-from-bottom duration-300">
      {/* Botón de cerrar */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full 
                     bg-gray-900/10 backdrop-blur-sm
                     flex items-center justify-center text-gray-900
                     hover:bg-gray-900/20 transition-colors"
          aria-label="Cerrar detalles"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}

      {/* Imagen */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={service.imageSrc}
          alt={service.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/90" />
      </div>

      {/* Contenido */}
      <CardContent className="p-6 bg-white">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-xl font-bold text-gray-900">
            {service.title}
          </CardTitle>
          <CardDescription className="text-gray-700 text-sm mt-2">
            {service.description}
          </CardDescription>
        </CardHeader>

        {service.features.length > 0 && (
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gray-700 mt-1.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">{feature}</span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
